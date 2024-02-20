import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFilm } from '../../utils/filmAPI';

function FilmDetails() {
  const { id } = useParams();
  const [film, setFilm] = useState(null);

  useEffect(() => {
    getFilm(id).then(setFilm);
  }, [id]);

  if (!film) return null;

  return (
    <div>
      <img src={film.imageName} alt={film.title} />
      <h2>{film.title}</h2>
      <p>{film.description}</p>
      <p>Released on {new Date(film.releaseDate).toLocaleDateString()}</p>
    </div>
  );
}

export default FilmDetails;