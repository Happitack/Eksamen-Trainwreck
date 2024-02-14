import React, { useState, useRef, useEffect } from 'react';
import { videos } from '../../constants';
import './AboutUs.css';

const { Train, DroneShot, GridCity, Winter, WinterAlt, RainyNight } = videos;

const AboutUs = ({ mainComponentRef }) => {
  const [currentVideo, setCurrentVideo] = useState(DroneShot);
  const [nextVideo, setNextVideo] = useState(null);
  const currentVideoRef = useRef();
  const nextVideoRef = useRef();

  const handleMouseEnter = (videoPath) => {
    const currentVideo = currentVideoRef.current;
    currentVideo.classList.add('blur-out');
    setNextVideo(videoPath);
  };

  const handleMouseLeave = () => {
    setNextVideo(DroneShot);
  }

  useEffect(() => {
    const nextVideoElement = nextVideoRef.current;
    if (nextVideo) {
      nextVideoElement.src = nextVideo;
      nextVideoElement.oncanplaythrough = () => {
        nextVideoElement.play();
        setCurrentVideo(nextVideo);
        nextVideoElement.classList.remove('blur-out');
      };
      nextVideoElement.load();
    }
  }, [nextVideo]);

  return (
    <div ref={mainComponentRef} className="app__aboutus" id="about">
      <video ref={currentVideoRef} autoPlay loop muted className="app__bg_anim" src={currentVideo} />
      {nextVideo && <video ref={nextVideoRef} loop muted className="app__bg_anim blur-out" src={nextVideo} />}

      <div className="app__aboutus-overlay align-bottom-left section__padding">
        
        <div className="app__aboutus_featured-item"
             onMouseEnter={() => handleMouseEnter(RainyNight)}
             onMouseLeave={handleMouseLeave}>
          <li className="app__aboutus_featured-item-title">
            <a href='' title="Paranoae">
              <h1 className="app__aboutus_featured_item_hero-title">
                Paranoae
              </h1>
            </a>
          </li>
        </div>

        <div className="app__aboutus_featured-item"
             onMouseEnter={() => handleMouseEnter(GridCity)}
             onMouseLeave={handleMouseLeave}>
          <li className="app__aboutus_featured-item-title">
            <a href='' title="Dolor">
              <h1 className="app__aboutus_featured_item_hero-title">
                Dolor
              </h1>
            </a>
          </li>
        </div>

        <div className="app__aboutus_featured-item"
             onMouseEnter={() => handleMouseEnter(Train)}
             onMouseLeave={handleMouseLeave}>
          <li className="app__aboutus_featured-item-title">
            <a href='' title="Ostracized">
              <h1 className="app__aboutus_featured_item_hero-title">
                Ostracized
              </h1>
            </a>
          </li>
        </div>

        <div className="app__aboutus_featured-item"
             onMouseEnter={() => handleMouseEnter(WinterAlt)}
             onMouseLeave={handleMouseLeave}>
          <li className="app__aboutus_featured-item-title">
            <a href='' title="WhatLiesBeyond">
              <h1 className="app__aboutus_featured_item_hero-title">
                What Lies Beyond
              </h1>
            </a>
          </li>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;