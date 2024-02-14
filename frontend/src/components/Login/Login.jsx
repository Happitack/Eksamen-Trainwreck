import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { authenticateUser } from '../../utils/api';
import './Login.css';

function Login({ onClose, onLogin }) {
  console.log('Login component rendered');
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isAuthenticated = await authenticateUser(username, password);
    if (isAuthenticated) {
      onLogin(username);
      navigate('/admin-dashboard')
    } else {
      // handle login failure
    }
  };

  return ReactDOM.createPortal(
    <div className="login-popup">
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Login</button>
        <button type="button" onClick={onClose}>Close</button>
      </form>
    </div>,
    document.body
  );
}

export default Login;