# -*- coding: utf-8 -*-

import sys
import io
from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import os
import requests

# === Force UTF-8 encoding for console output (Windows safe) ===
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# === Use absolute paths ===
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(BASE_DIR, "models", "plant_identification_model2.tflite")
class_file = os.path.join(BASE_DIR, "models", "classname2.txt")

# === Load TFLite Model ===
interpreter = tf.lite.Interpreter(model_path=model_path)
interpreter.allocate_tensors()
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()
IMAGE_SIZE = (224, 224)

# === Load Class Names ===
try:
    with open(class_file, 'r', encoding='utf-8') as f:
        class_names = [line.strip() for line in f if line.strip()]
except FileNotFoundError:
    print("❌ Error: 'classname2.txt' not found.")
    exit()
except Exception as e:
    print(f"❌ Error reading class names: {e}")
    exit()

# === Flask Setup ===
app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    try:
        # 1. Load and preprocess image
        img = Image.open(request.files['image'].stream).convert("RGB").resize(IMAGE_SIZE)
        img_array = np.expand_dims(np.array(img) / 255.0, axis=0).astype(np.float32)

        # 2. Inference
        interpreter.set_tensor(input_details[0]['index'], img_array)
        interpreter.invoke()
        output = interpreter.get_tensor(output_details[0]['index'])[0]

        # 3. Get prediction and confidence
        index = int(np.argmax(output))
        confidence = float(output[index])

        # 4. Confidence threshold and fallback
        if confidence < 0.2 or index >= len(class_names):
            label = "Unknown Species"
            print(f"🔎 Prediction below 20% confidence ({confidence:.2f}), classified as Unknown.")
        else:
            label = class_names[index]

        # 5. Save prediction to main backend (optional)
        try:
            requests.post(
                "http://localhost:5000/api/save-prediction",
                json={"plant_name": label, "confidence": confidence}
            )
        except Exception as log_error:
            print("⚠️ Could not send prediction to main backend:", log_error)

        # 6. Return result
        return jsonify({'plant': label, 'confidence': confidence})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
