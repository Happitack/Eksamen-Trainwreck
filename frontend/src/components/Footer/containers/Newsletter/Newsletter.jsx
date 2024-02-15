import React, { useState } from 'react';
import { subscribe } from '../../../../utils/newsletterAPI'
import './Newsletter.css';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const subscribeToNewsletter = async (e) => {
    e.preventDefault();
    try {
      const response = await subscribe(email);
      setSuccess(response.message);
      setError('');
      setInputValue('');
    } catch (error) {
      if (error.message === 'Email is already subscribed') {
        setError('This email is already subscribed to the newsletter.');
      } else {
        setError('An error occurred. Please try again.');
      }
      setInputValue('');
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
          <button type="button" className="custom__button" onClick={subscribeToNewsletter}>
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