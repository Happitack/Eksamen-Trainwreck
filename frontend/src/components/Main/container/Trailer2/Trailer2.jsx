import React, { useState, useRef } from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import { videos } from '../../../../constants';
import './Trailer2.css';

const { RainyNight } = videos;

const Trailer2 = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlayPause = () => {
    const video = videoRef.current;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }

    setIsPlaying(!isPlaying);
  };

  return <div className="app__video">
      <video ref={videoRef} src={RainyNight} type="video/mp4" loop controls={false} muted onClick={togglePlayPause} />

      <div className="app__video-overlay flex__center" onClick={togglePlayPause} id="trailer">
        {!isPlaying && <div className="app__video-overlay_circle flex__center">
            <BsFillPlayFill color="#fff" fontSize={30} />
          </div>}
      </div>
    </div>;
};

export default Trailer2;