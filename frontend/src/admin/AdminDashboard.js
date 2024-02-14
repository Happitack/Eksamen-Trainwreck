import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FilmsAdmin from '../admin/components/FilmsAdmin/FilmsAdmin';
import NewsletterAdmin from '../admin/components/NewsletterAdmin/NewsletterAdmin';
import './AdminDashboard.css';



const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('films');
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <div>
      <ul className="admin-tabs">
      <button onClick={handleLogout}>Logout</button>

        <li
          className={activeTab === 'films' ? 'active' : ''}
          onClick={() => handleTabChange('films')}
        >
          Films Admin
        </li>
        <li
          className={activeTab === 'newsletter' ? 'active' : ''}
          onClick={() => handleTabChange('newsletter')}
        >
          Newsletter Admin
        </li>
      </ul>

      {activeTab === 'films' && <FilmsAdmin />}
      {activeTab === 'newsletter' && <NewsletterAdmin />}
    </div>
  );
};

export default AdminDashboard;
