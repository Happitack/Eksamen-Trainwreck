import React from 'react';
import './SoMe.css';

const SoMe = () => {
  return (
    <div className="soMe" id="soMe">
      <h1>CONECT WITH OUR SOCIAL MEDIA</h1>
      <div className="soMe-links">
        <ul>
          <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">FACEBOOK</a></li>
          <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">TWITTER</a></li>
          <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">INSTAGRAM</a></li>
          <li><a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">TIKTOK</a></li>
          <li><a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">YOUTUBE</a></li>
        </ul>
      </div>
    </div>
  );
};

export default SoMe;
