import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppRouter from '../src/routers/router';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);