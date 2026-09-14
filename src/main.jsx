import React from 'react';
import { createRoot } from 'react-dom/client';
import Home from './pages/index';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);
