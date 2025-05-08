import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './framework/css/bootstrap.min.css';

const root = createRoot(document.getElementById('root'));
console.log("Index rendering App now...");
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
