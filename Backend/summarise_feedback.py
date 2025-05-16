from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import os

# === Load TFLite Model ===
interpreter = tf.lite.Interpreter(model_path="models/plant_identification_model.tflite")
interpreter.allocate_tensors()
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()
IMAGE_SIZE = (224, 224)

# === Load Class Names from .txt file ===
try:
    with open('models/classname.txt', 'r') as f:
        class_names = [line.strip() for line in f if line.strip()]
except FileNotFoundError:
    print("❌ Error: 'models/classname.txt' not found.")
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
        # Load and preprocess image
        img = Image.open(request.files['image'].stream).convert("RGB").resize(IMAGE_SIZE)
        img_array = np.expand_dims(np.array(img) / 255.0, axis=0).astype(np.float32)

        # Run inference
        interpreter.set_tensor(input_details[0]['index'], img_array)
        interpreter.invoke()
        output = interpreter.get_tensor(output_details[0]['index'])[0]

        index = int(np.argmax(output))
        label = class_names[index]
        confidence = float(output[index])

        return jsonify({'plant': label, 'confidence': confidence})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
