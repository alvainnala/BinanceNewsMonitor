import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://api.binance.com';

ReactDOM.render(
  <React.StrictMode>
    <App apiUrl={API_BASE_URL} />
  </React.StrictType>,
  document.getElementById('root')
);