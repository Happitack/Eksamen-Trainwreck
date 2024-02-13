import React from 'react';
import images from '../../constants/images';

const MediaContainer = ({ imageName }) => {
  const image = images[imageName];

  return (
    <div className='mediaContainer section__padding'>
      <img src={image} alt={imageName} />
    </div>
  );
};

export default MediaContainer;