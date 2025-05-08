import React from 'react';
import { Link } from 'react-router-dom';

function Forbidden() {
  return <div><h2>403 Forbidden</h2><p>You do not have access to this page.</p><Link to="/dashboard">Back to Dashboard</Link></div>;
}

export default Forbidden;