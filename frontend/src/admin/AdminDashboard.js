import React, { useState } from 'react';
import FilmsAdmin from '../admin/components/FilmsAdmin/FilmsAdmin';
import NewsletterAdmin from '../admin/components/NewsletterAdmin/NewsletterAdmin';
import './AdminDashboard.css';



const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('films');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <ul className="admin-tabs">
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
