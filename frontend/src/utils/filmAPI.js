export async function getFilms() {
  const response = await fetch('http://localhost:4000/api/films');
  return response.json();
}

export async function createFilm(film) {
  const response = await fetch('http://localhost:4000/api/films', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(film),
  });
  return response.json();
}

export async function deleteFilm(filmId) {
  const response = await fetch(`http://localhost:4000/api/films/${filmId}`, {
    method: 'DELETE',
  });
  return response.ok;
}

export async function updateFilm(film) {
  const { _id, ...filmDetails } = film;
  const response = await fetch(`http://localhost:4000/api/films/${_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(filmDetails),
  });
  return response.ok;
}
