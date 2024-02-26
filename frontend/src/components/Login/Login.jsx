import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { authenticateUser, fetchProtectedData } from '../../utils/api';
import './Login.css';

function Login({ onClose, onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = await authenticateUser(username, password);
    // If the server responds with a token, the function saves the token in the local storage and calls the onLogin function with the username as an argument.
    if (token) {
      localStorage.setItem('token', token);
      onLogin(username);
    
      // Fetch protected data after successful login
      const data = await fetchProtectedData();
      console.log(data);
      if (data) {
        navigate('/admin-dashboard');
      } else {
        setErrorMessage("Failed to fetch protected data");
      }
    } else {
      // handles login failure
      setErrorMessage("Login unsuccessful");
    }
  };

  return ReactDOM.createPortal(
    <div className="login-popup">
      <div className="login-popup-close">
        <button className="close-button" type="button" onClick={onClose}>X</button>
      </div>
      <div className="login-popup-top">
      <h2>Admin Access</h2>
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
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>,
    document.body
  );
}

export default Login;