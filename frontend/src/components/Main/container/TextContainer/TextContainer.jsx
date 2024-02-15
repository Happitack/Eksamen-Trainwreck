import React from 'react';

import './TextContainer.css';

const TextContainer = ({ title, releaseDate, description }) => (
  <div id={title.replace(/\s+/g, '').toLowerCase()} className='textContainer section__padding'>
    <h1 className="textContainer-title">{title}</h1>
    <h2>{releaseDate}</h2>
    <p>{description}</p>
    <div className="textContainer-button">
      <button className="readMoreButton">READ MORE</button>
    </div>
  </div>

);

export default TextContainer;