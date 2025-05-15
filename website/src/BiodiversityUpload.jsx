import React, { useState } from 'react';

function BiodiversityUpload() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [speciesName, setSpeciesName] = useState('');
  const [result, setResult] = useState(null); // to show prediction result

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Server error');

      const data = await response.json();
      setResult({
        label: data.plant,
        confidence: (data.confidence * 100).toFixed(2),
      });
    } catch (error) {
      console.error('Upload error:', error);
      alert('❌ Prediction failed. See console for details.');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file)); // show the selected image
  };

  return (
    <div className="container mt-4">
      <h2>📷 Upload Biodiversity Image</h2>
      <form onSubmit={handleUpload} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Species Name (optional)</label>
          <input
            type="text"
            className="form-control"
            value={speciesName}
            onChange={(e) => setSpeciesName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">Upload</button>
      </form>

      {/* === Preview Section === */}
      {previewUrl && (
        <div className="mt-4">
          <h5>🖼️ Selected Image:</h5>
          <img src={previewUrl} alt="Preview" style={{ maxWidth: '300px', border: '1px solid #ccc' }} />
        </div>
      )}

      {/* === Result Display === */}
      {result && (
        <div className="mt-4">
          <h5>✅ Prediction Result:</h5>
          <p><strong>Plant:</strong> {result.label}</p>
          <p><strong>Confidence:</strong> {result.confidence}%</p>
        </div>
      )}
    </div>
  );
}

export default BiodiversityUpload;
