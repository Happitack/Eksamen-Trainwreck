import React from 'react';
import images from '../../constants/images';
import './MediaContainer.css';

const MediaContainer = ({ imageName }) => {
  const image = images[imageName];

  if (!image) {
    console.error(`Image not found: ${imageName}`);
    return null;
  }

  return (
    <div className='mediaContainer section__padding'>
      <img src={image} alt={imageName} />
    </div>
  );
};

export default MediaContainer;