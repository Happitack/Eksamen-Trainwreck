import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { TextContainer, MediaContainer, Trailer1, Trailer2} from '../../container';
import './Main.css';

const Main = ({ mainComponentRef }) => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/films')
      .then(response => {
        setFilms(response.data);
        console.log('Films fetched: ', response.data);
      })
      .catch(error => {
        console.error('Error fetching films: ', error);
      });
  }, []);


  // Define the order of components
  const componentsOrder = ['film', 'Trailer1', 'film', 'film', 'Trailer2', 'film'];

  let filmIndex = 0;


  return (
    <div>
      {componentsOrder.map((componentType, index) => {
        if (componentType === 'film' && films[filmIndex]) {
          const film = films[filmIndex];
          filmIndex++;
          return (
            <div className="filmContainer" key={film._id} >
              {filmIndex % 2 === 0 ? (
                <>
                  <MediaContainer imageName={film.imageName} />
                  <TextContainer title={film.title} description={film.description} releaseDate={film.releaseDate} />
                </>
              ) : (
                <>
                  <TextContainer title={film.title} description={film.description} releaseDate={film.releaseDate} />
                  <MediaContainer imageName={film.imageName} />
                </>
              )}
            </div>
          );
        } else if (componentType === 'Trailer1') {
          return <Trailer1 key={componentType} />;
        } else if (componentType === 'Trailer2') {
          return <Trailer2 key={componentType} />;
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default Main;