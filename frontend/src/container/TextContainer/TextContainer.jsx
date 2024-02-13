import React from 'react';

const TextContainer = ({ title, releaseDate, description }) => (
  <div className='textContainer section__padding'>
    <h1 className="textContainer-title">{title}</h1>
    <h2>{new Date(releaseDate).toLocaleDateString()}</h2>
    <p>{description}</p>
  </div>
);

export default TextContainer;