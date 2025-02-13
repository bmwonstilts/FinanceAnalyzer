import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';  // This must come before App import
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);