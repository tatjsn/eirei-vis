import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import data from './data.json';
import schema from './schema.json';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App data={data} schema={schema} />
  </React.StrictMode>
);
