import React, { useEffect, useState } from 'react';
import { getFilms } from '../../utils/filmAPI';
import { TextContainer, MediaContainer, Trailer1, Trailer2} from './container';
import { Blog } from '../';
import './Main.css';

const Main = ({ mainComponentRef }) => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    getFilms()
      .then(films => {
        setFilms(films);
        console.log('Films fetched: ', films);
      })
      .catch(error => {
        console.error('Error fetching films: ', error);
      });
  }, []);


  // Define the order of components
  const componentsOrder = ['film', 'Trailer1', 'film', 'Trailer2', 'film', 'film',  'Blog',];

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
                  <TextContainer id={film._id} title={film.title} description={film.description} releaseDate={film.releaseDate} />
                </>
              ) : (
                <>
                  <TextContainer id={film._id} title={film.title} description={film.description} releaseDate={film.releaseDate} />
                  <MediaContainer imageName={film.imageName} />
                </>
              )}
            </div>
          );
        } else if (componentType === 'Trailer1') {
          return <Trailer1 key={componentType} />;
        } else if (componentType === 'Trailer2') {
          return <Trailer2 key={componentType} />;
        } else if (componentType === 'Blog') {
          return <Blog key={componentType} />;
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default Main;