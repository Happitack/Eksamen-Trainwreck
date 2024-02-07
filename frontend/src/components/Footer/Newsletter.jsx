import React, { useState } from 'react';
import SubHeading from '../SubHeading/SubHeading';
import axios from 'axios';
import './Newsletter.css';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const subscribe = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/newsletter/subscribe', { email });
      setSuccess(res.data.message);
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
    }
  }

  return (
    <div className="app__newsletter" id="newsletter">
      <div className="app__newsletter-heading">
        <SubHeading title="Newsletter" />
        <h1 className="headtext__cormorant">Subscribe to our newsletter</h1>
        <p className="p__opensans">And never miss latest Updates!</p>
      </div>

      <div className="app__newsletter-input flex__center">
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="button" className="custom__button" onClick={subscribe}>
          Subscribe
        </button>
      </div>
        {error && <div className="app__newsletter_errormsg">{error}</div>}
        {success && <div className="app__newsletter_successmsg">{success}</div>}
    </div>
  );
};

export default Newsletter;