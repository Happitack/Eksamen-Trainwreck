import React, { useState, useRef, useEffect } from 'react';
import { getFilms } from '../../utils/filmAPI';
import { videos} from '../../constants';
import './AboutUs.css';

const { Paranoae, Ostracized, Winter, WhatLiesBeyond, Dolor } = videos;

const videoMap = {
  'paranoae': Paranoae,
  'ostracized': Ostracized,
  'winter': Winter,
  'whatliesbeyond': WhatLiesBeyond,
  'dolor': Dolor
};

const AboutUs = ({ mainComponentRef }) => {
  const [currentVideo, setCurrentVideo] = useState(Paranoae);
  const [nextVideo, setNextVideo] = useState(null);
  const currentVideoRef = useRef();
  const nextVideoRef = useRef();
  const [films, setFilms] = useState([]);


  useEffect(() => {
    getFilms().then(data => setFilms(data));
  }, []);

  const handleMouseEnter = (videoPath) => {
    const currentVideo = currentVideoRef.current;
    // Add the blur to the current video
    currentVideo.classList.add('blur-out');
    // Start loading the new video
    setTimeout(() => {
      setNextVideo(videoPath);
    }, 500); // 2000 milliseconds = 2 seconds
  };
  
  useEffect(() => {
    const nextVideoElement = nextVideoRef.current;
    if (nextVideo) {
      nextVideoElement.src = nextVideo;
      nextVideoElement.oncanplaythrough = () => {
        // Remove the blur from the current video when the new video is ready
        const currentVideo = currentVideoRef.current;
        currentVideo.classList.remove('blur-out');
        // Start playing the new video
        nextVideoElement.play();
        setCurrentVideo(nextVideo);
      };
      nextVideoElement.load();
    }
  }, [nextVideo]);

  return (
    <div ref={mainComponentRef} className="app__aboutus" id="about">
      <video ref={currentVideoRef} autoPlay loop muted className="app__bg_anim" src={currentVideo} />
      {nextVideo && <video ref={nextVideoRef} loop muted className="app__bg_anim blur-out" src={nextVideo} style={{ display: 'none' }} />}

      <div className="app__aboutus-overlay align-bottom-left section__padding">
        {films.map((film, index) => (
          <div key={index} className="app__aboutus_featured-item"
          onMouseEnter={() => handleMouseEnter(videoMap[film.imageName.toLowerCase()])}>
            <li className="app__aboutus_featured-item-title">
              <a href={`#${film.title.replace(/\s+/g, '').toLowerCase()}`} title={film.title}>
                <h1 className="app__aboutus_featured_item_hero-title">
                  {film.title}
                </h1>
              </a>
            </li>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;