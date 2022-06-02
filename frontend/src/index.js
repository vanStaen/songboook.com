import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './fonts/Dymo.ttf';

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").then(() => {
    console.log("Service Worker Registered");
  });
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

