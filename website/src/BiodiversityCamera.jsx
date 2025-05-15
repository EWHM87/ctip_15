import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import './App.css';

const BiodiversityCamera = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [aiResult, setAiResult] = useState('');
  const [confidence, setConfidence] = useState('');
  const [loading, setLoading] = useState(false);
  const webcamRef = useRef(null);

  const API_URL = 'http://localhost:8000/predict'; // Updated backend route

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewSrc(URL.createObjectURL(file));
      setAiResult('');
      setConfidence('');
    }
  };

  const captureFromWebcam = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    fetch(imageSrc)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], 'webcam-capture.jpg', { type: blob.type });
        setSelectedImage(file);
        setPreviewSrc(imageSrc);
        setAiResult('');
        setConfidence('');
      });
  };

  const handleSubmit = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('image', selectedImage);

    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.error) {
        setAiResult('❌ Error: ' + data.error);
        setConfidence('');
      } else {
        setAiResult(data.plant);
        setConfidence((data.confidence * 100).toFixed(2) + '%');
      }
    } catch (error) {
      setAiResult('❌ Error connecting to AI backend.');
      setConfidence('');
    }
    setLoading(false);
  };

  return (
    <div className="biodiversity-camera-container">
      <h2>📷 Species Identification Camera</h2>
      <p>Upload or capture a photo to let our AI model identify the species in real-time.</p>

      <div className="biodiversity-camera-panel">
        {/* Webcam Section */}
        <div className="camera-column">
          <div className="card shadow-sm p-3">
            <h5 className="text-center">Live Webcam</h5>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="camera-preview"
            />
            <button
              className="capture-button"
              onClick={captureFromWebcam}
              title="Capture an image from webcam"
            >
              📸 Capture from Webcam
            </button>
          </div>
        </div>

        {/* Upload Section */}
        <div className="upload-column">
          <div className="card shadow-sm p-3">
            <h5 className="text-center">Upload Image</h5>
            <label className="form-label" htmlFor="imageUpload">Choose an image file</label>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageChange}
              className="form-control"
            />

            {previewSrc && (
              <img src={previewSrc} alt="Preview" className="upload-preview mt-3" />
            )}

            <button
              className="identify-button"
              onClick={handleSubmit}
              title="Submit image for AI species identification"
              disabled={loading}
            >
              {loading ? '🔄 Identifying...' : '🔍 Identify Species'}
            </button>

            {loading && (
              <div className="text-center mt-3">
                <div className="spinner-border text-success" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}

            {aiResult && (
              <div className="ai-result mt-3">
                🧠 <strong>AI Prediction:</strong> {aiResult} <br />
                🎯 <strong>Confidence:</strong> {confidence}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiodiversityCamera;
