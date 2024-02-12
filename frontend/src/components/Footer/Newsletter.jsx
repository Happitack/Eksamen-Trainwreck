import React, { useState } from 'react';
import axios from 'axios';
import './Newsletter.css';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const subscribe = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post('/api/newsletter/subscribe', { email });
      setSuccess(res.data.message);
      setError('');
      setInputValue('');
    } 
    catch (err) {
      if (err.response && err.response.data) {
        if (err.response.data.errors) {
          setError(err.response.data.errors[0].msg);
        } 
        else if (err.response.data.error) {
          setError(err.response.data.error);
        }
      } 
      else {
        setError('An error occurred. Please try again.');
      }
      setInputValue(''); // clear the input field
    }
  }

  const handleChange = (e) => {
    setEmail(e.target.value);
    setInputValue(e.target.value);
    setError(''); // clear the error when the input changes
  }

  return (
    <div className="newsletter" id="newsletter">
      <div className="newsletter-text">
        <h1>SUBSCRIBE TO OUR NEWSLETTER</h1>
        <p>Sign up to our newsletter and recieve information about ongoing projects, trailers, podcasts and more!</p>
      </div>
      {!success ? (
        <div className="newsletter-input flex__center">
          <input
            type="email"
            placeholder={error ? error : "Enter your email address"}
            value={inputValue}
            onChange={handleChange}
            className={error ? "input-error" : ""}
          />
          <button type="button" className="custom__button" onClick={subscribe}>
            Subscribe
          </button>
        </div>
      ) : (
        <div className="newsletter_successmsg">{success}</div>
      )}
    </div>
  );
};

export default Newsletter;