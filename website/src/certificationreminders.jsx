import React from 'react';

const reminders = [
  { name: 'Alice Tan', cert: 'Eco-tourism Ethics', due: '2024-05-01' },
  { name: 'Mark Lee', cert: 'Wildlife Handling', due: '2024-06-10' },
];

function CertificationReminders() {
  return (
    <div className="container mt-4">
      <h2>Certification Renewal Reminders</h2>
      <table className="table table-hover mt-3">
        <thead className="table-warning">
          <tr>
            <th>Guide Name</th>
            <th>Certification</th>
            <th>Renewal Due</th>
          </tr>
        </thead>
        <tbody>
          {reminders.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.cert}</td>
              <td>{item.due}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CertificationReminders;
