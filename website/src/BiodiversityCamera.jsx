import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';

const BiodiversityCamera = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [aiResult, setAiResult] = useState('');
  const [loading, setLoading] = useState(false);
  const webcamRef = useRef(null);

  const API_URL = 'http://localhost:5000/api/ai/identify'; // change to your AI endpoint

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewSrc(URL.createObjectURL(file));
      setAiResult('');
    }
  };

  const captureFromWebcam = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    fetch(imageSrc)
      .then(res => res.blob())
      .then(blob => {
        setSelectedImage(new File([blob], 'webcam-capture.jpg', { type: blob.type }));
        setPreviewSrc(imageSrc);
        setAiResult('');
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
      setAiResult(data.label || 'Unknown');
    } catch (error) {
      setAiResult('Error identifying image.');
    }
    setLoading(false);
  };

  return (
    <div className="container mt-4">
      <h2>📷 Species Identification Camera</h2>
      <p>Upload an image or capture one using your webcam to identify species using our AI engine.</p>

      <div className="row mt-4">
        {/* Webcam Panel */}
        <div className="col-md-6 text-center">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width="100%"
            className="rounded shadow-sm"
          />
          <button className="btn btn-outline-primary mt-3" onClick={captureFromWebcam}>
            📸 Capture from Webcam
          </button>
        </div>

        {/* File Upload Panel */}
        <div className="col-md-6">
          <label className="form-label">📁 Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="form-control mb-3" />

          {previewSrc && (
            <img src={previewSrc} alt="Preview" className="img-fluid rounded shadow-sm mb-3" />
          )}

          <button className="btn btn-success w-100" onClick={handleSubmit} disabled={loading}>
            {loading ? '🔍 Identifying...' : '🔍 Identify Species'}
          </button>

          {aiResult && (
            <div className="alert alert-info mt-4 text-center">
              🧠 <strong>AI Prediction:</strong> {aiResult}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BiodiversityCamera;
