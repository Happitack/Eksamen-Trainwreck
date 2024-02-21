import React, { useState, useEffect } from 'react';
import { useParams , useNavigate } from 'react-router-dom';
import { getFilm } from '../../utils/filmAPI';
import images from '../../constants/images';
import Footer from '../Footer/Footer';
import './FilmDetails.css';

function FilmDetails() {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    getFilm(id).then(setFilm);
  }, [id]);

  if (!film) return null;

  const image = images[film.imageName];
  if (!image) {
    console.error(`Image not found: ${film.imageName}`);
    return null;
  }

  const goBack = () => {
    navigate(-1); // Navigate back
  };

  return (
    <>
      <div className="FilmDetails_Container">
        <div className="FilmDetails_textContainer">

          <div className="FilmDetails_textContainer_info">
            <div className="FilmDetails_textContainer_title">
              <h2>{film.title}</h2>
            </div>
            <div className="FilmDetails_textContainer_releaseDate">
              <h2>Release Date:</h2> 
              <p>{new Date(film.releaseDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>

            <div className="FilmDetails_textContainer_cast">
              <p>WRITTEN AND DIRECTED BY:</p>
            </div>

            <div className="FilmDetails_textContainer_cast">
              <p>CAST:</p>
            </div>
            <div className="FilmDetails_textContainer_description">
              <h3>FILM SUMMARY</h3>
              <p>{film.description}</p>
            </div>
          </div>
          <div className="FilmDetails_textContainer_buttonWrapper">
            <button className="FilmDetails_textContainer_button" onClick={goBack}>Back</button>
          </div>
        </div>
        <div className='FilmDetails_mediaContainer'>
          <img src={image} alt={film.title} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default FilmDetails;