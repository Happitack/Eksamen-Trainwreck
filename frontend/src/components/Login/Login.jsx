import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { authenticateUser } from '../../utils/api';
import './Login.css';

function Login({ onClose, onLogin }) {
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
      <div className="login-popup-top">
      <h2>USER LOGIN</h2>
      <button className="close-button" type="button" onClick={onClose}>X</button>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          <p>Username:</p>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          <p>Password:</p>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <div className="loginButtons">
          <button type="submit">LOGIN</button>
        </div>
      </form>
    </div>,
    document.body
  );
}

export default Login;