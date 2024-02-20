import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TextContainer.css';

const TextContainer = ({ id, title, releaseDate, description }) => {
  const navigate = useNavigate();

  const handleReadMoreClick = () => {
    navigate(`/film/${id}`);
  };

  return (
    <div id={title.replace(/\s+/g, '').toLowerCase()} className='textContainer'>
      <div className="textContainer-overlay">
        <h1 className="textContainer-title">{title}</h1>
        <h2>{releaseDate}</h2>
        <p>{description}</p>
      </div>
      <div className="textContainer-button">
        <button className="readMoreButton" onClick={handleReadMoreClick}>READ MORE</button>
      </div>
    </div>
  );
};

export default TextContainer;