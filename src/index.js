import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import(
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Roboto:ital,wght@0,400;1,500&family=Sono:wght@500&display=swap'
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
