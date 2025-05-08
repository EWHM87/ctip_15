import React from 'react';

const parks = [
  {
    name: 'Semenggoh Nature Reserve',
    location: 'Kuching, Sarawak',
    description: 'Famous for its orangutan rehabilitation centre and rich rainforest biodiversity.',
  },
  {
    name: 'Gunung Mulu National Park',
    location: 'Miri, Sarawak',
    description: 'UNESCO World Heritage site known for limestone karsts, caves, and diverse ecosystems.',
  },
  {
    name: 'Bako National Park',
    location: 'Kuching, Sarawak',
    description: 'Sarawak’s oldest national park with stunning cliffs, beaches, and proboscis monkeys.',
  },
];

function ParkInfo() {
  return (
    <div className="container mt-4">
      <h2>🌳 Park Information</h2>
      <p>Explore protected areas under Sarawak Forestry Corporation (SFC).</p>

      <div className="row mt-4">
        {parks.map((park, index) => (
          <div key={index} className="col-md-4 mb-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{park.name}</h5>
                <h6 className="card-subtitle text-muted">{park.location}</h6>
                <p className="card-text mt-2">{park.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ParkInfo;
