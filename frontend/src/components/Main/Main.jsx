import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextContainer, MediaContainer, Trailer1, Trailer2} from '../../container';

const Main = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    axios.get('/api/films')
      .then(response => {
        setFilms(response.data);
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
            <div key={film._id}>
              {index % 2 === 0 ? (
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