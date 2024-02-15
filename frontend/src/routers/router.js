import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from '../App';
import AdminDashboard from '../admin/AdminDashboard';
import BlogDetails from '../components/BlogDetails/BlogDetails';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;