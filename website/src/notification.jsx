import React from 'react';

const guideNotifications = [
  { id: 1, date: '2024-04-15', message: 'New training on Wildlife Ethics starts June 10, 2024.' },
  { id: 2, date: '2024-04-10', message: 'Don’t forget to renew your First Aid certification by June 1, 2024.' },
  { id: 3, date: '2024-03-30', message: 'Park safety module updated. Please review in the training section.' },
];

function Notifications() {
  return (
    <div className="container mt-4">
      <h2>📢 My Notifications</h2>
      <ul className="list-group mt-3">
        {guideNotifications.map((note) => (
          <li key={note.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{note.message}</span>
            <span className="badge bg-secondary">{note.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
