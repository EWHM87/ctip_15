import React from 'react';
import './App.css';

function Accommodation() {
  const stays = [
    {
      name: 'Semenggoh Rainforest Lodge',
      type: 'Eco-Lodge',
      image: '/image/lodge.jpg',
      distance: 'Inside the park',
      description: 'Stay close to nature with basic yet comfortable rainforest accommodations near the orangutan zones.'
    },
    {
      name: 'Borneo Highlands Resort',
      type: 'Resort',
      image: '/image/resort.jpg',
      distance: '15 mins from Semenggoh',
      description: 'A peaceful getaway with spa, jungle treks, and mountain views. Ideal for eco-tourists and families.'
    },
    {
      name: 'Kuching Homestay @ Padawan',
      type: 'Homestay',
      image: '/image/homestay.jpg',
      distance: '10 mins from Semenggoh',
      description: 'Local homestay hosted by friendly families. Great for cultural experience and affordable lodging.'
    }
  ];

  return (
    <div className="gb-accom-container container py-5">
      <h2 className="text-center text-success fw-bold mb-4">🏨 Where to Stay Near Semenggoh</h2>
      <p className="text-center text-muted mb-5">
        Whether you prefer staying in the forest or nearby villages, here are some comfortable options.
      </p>

      <div className="row g-4">
        {stays.map((place, idx) => (
          <div className="col-md-6 col-lg-4" key={idx}>
            <div className="card h-100 shadow-sm border-0">
              <img src={place.image} alt={place.name} className="gb-accom-img card-img-top" />
              <div className="card-body">
                <h5 className="fw-bold">{place.name}</h5>
                <p className="text-muted mb-1">{place.type} · {place.distance}</p>
                <p className="text-muted">{place.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Accommodation;
