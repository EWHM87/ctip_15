import React, { useState } from 'react';

function BiodiversityUpload() {
  const [image, setImage] = useState(null);
  const [speciesName, setSpeciesName] = useState('');

  const handleUpload = (e) => {
    e.preventDefault();
    alert(`✅ Submitted: ${speciesName || 'Unknown species'} with photo.`);
    setImage(null);
    setSpeciesName('');
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
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">Upload</button>
      </form>
    </div>
  );
}

export default BiodiversityUpload;
