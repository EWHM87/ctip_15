# -*- coding: utf-8 -*-

from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import os
import requests

# === Use absolute paths ===
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(BASE_DIR, "models", "plant_identification_model.tflite")
class_file = os.path.join(BASE_DIR, "models", "classname.txt")

# === Load TFLite Model ===
interpreter = tf.lite.Interpreter(model_path=model_path)
interpreter.allocate_tensors()
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()
IMAGE_SIZE = (224, 224)

# === Load Class Names ===
try:
    with open(class_file, 'r') as f:
        class_names = [line.strip() for line in f if line.strip()]
except FileNotFoundError:
    print("❌ Error: 'classname.txt' not found.")
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

        index = int(np.argmax(output))
        confidence = float(output[index])

        # 3. Safety Check: Index + Threshold
        if index >= len(class_names) or confidence < 0.2:
            label = "Unknown Species"
        else:
            label = class_names[index]

        # 4. Save prediction to main server
        try:
            requests.post(
                "http://localhost:5000/api/save-prediction",
                json={"plant_name": label, "confidence": confidence}
            )
        except Exception as log_error:
            print("⚠️ Could not send prediction to main backend:", log_error)

        return jsonify({'plant': label, 'confidence': confidence})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
