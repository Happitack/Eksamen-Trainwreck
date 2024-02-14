import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from '../App';
import AdminDashboard from '../admin/AdminDashboard';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;