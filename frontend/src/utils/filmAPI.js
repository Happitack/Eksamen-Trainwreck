export async function getFilms() {
  const response = await fetch('/api/films');
  return response.json();
}

export async function createFilm(film) {
  const response = await fetch('/api/films', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(film),
  });
  return response.ok;
}

export async function deleteFilm(filmId) {
  const response = await fetch(`/api/films/${filmId}`, {
    method: 'DELETE',
  });
  return response.ok;
}

export async function updateFilm(film) {
  const response = await fetch(`/api/films/${film._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(film),
  });
  return response.ok;
}

