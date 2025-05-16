# 🌿 AI Biodiversity Scanner

This project is an AI-powered mobile tool that allows users to scan plant images using their phone's camera and receive instant species identification via a TensorFlow Lite model.

---

## 📱 Mobile App (React Native with Expo)

### Features
- Open camera from mobile device
- Capture photo and send to AI backend
- Display predicted plant species and confidence

### Prerequisites
- Node.js & npm
- Expo CLI: `npm install -g expo-cli`
- Expo Go app installed on your phone (Android/iOS)

### Setup

1. Navigate to the mobile app folder:

   ```bash
   cd mobile
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Edit the server IP in `AIBiodiversity.js`:

   ```js
   const res = await axios.post('http://YOUR_PC_LOCAL_IP:8000/predict', formData, {
   ```

4. Start the app:

   ```bash
   npx expo start
   ```

5. Scan the QR code with Expo Go on your phone.

---

## 🧠 AI Backend (Flask + TensorFlow Lite)

### Features
- Accepts image uploads via `/predict` POST API
- Runs TFLite model to classify plant species
- Returns prediction and confidence
- Optional: Forwards result to another backend for logging

### Prerequisites
- Python 3.10 (64-bit recommended)
- Virtual environment (optional but encouraged)

### Setup

1. Navigate to the backend folder:

   ```bash
   cd Backend
   ```

2. Create and activate virtual environment:

   ```bash
   py -3.10 -m venv venv
   venv\Scripts\activate   # On Windows
   ```

3. Install dependencies:

   ```bash
   pip install flask flask-cors tensorflow pillow
   ```

4. Run the server:

   ```bash
   python ai_server.py
   ```

   Make sure you note the server IP, e.g. `http://192.168.0.10:8000`.

---

## 📁 File Structure Overview

```
├── Backend/
│   ├── ai_server.py               # Flask server with /predict route
│   ├── models/
│   │   ├── plant_identification_model.tflite
│   │   └── classname.txt
│   └── venv/                      # (optional) Python virtual environment
├── mobile/
│   ├── screens/
│   │   └── AIBiodiversity.js      # Camera + prediction component
│   └── App.js
├── README.md
```

---

## 🛠 Troubleshooting

### Mobile:
- Make sure your **phone and PC are on the same WiFi**
- Confirm the IP used in the React Native app matches the PC's local IP
- If Expo shows `Network request failed`, check Windows Firewall

### Backend:
- Use Python 3.10 only (TensorFlow is not yet supported on 3.13+)
- If model gives poor predictions:
  - Improve input quality (lighting, closeup)
  - Retrain with more diverse data

---

## 👨‍🔬 Acknowledgements

- TensorFlow Lite for edge ML inference
- Flask for lightweight server
- Expo React Native for cross-platform development
