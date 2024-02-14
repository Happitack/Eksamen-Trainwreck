import React, { useState, useEffect } from 'react';
import { getFilms, createFilm, updateFilm, deleteFilm } from '../../../utils/filmAPI';
import './FilmsAdmin.css';

function FilmsAdmin() {
  const [films, setFilms] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', releaseDate: '', imageName: '' });

  useEffect(() => {
    fetchFilms();
  }, []);

  const fetchFilms = async () => {
    const films = await getFilms();
    setFilms(films);
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    await createFilm(form);
    fetchFilms();
  };

  const handleUpdate = async (id) => {
    const updatedFilm = films.find(film => film.id === id);
    await updateFilm(id, updatedFilm);
    fetchFilms();
  };

  const handleDelete = async (id) => {
    await deleteFilm(id);
    fetchFilms();
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <div className="container">
      <form onSubmit={handleCreate} className="form">
        <input className="input" name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
        <textarea className="input" name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
        <input className="input" name="releaseDate" value={form.releaseDate} onChange={handleChange} placeholder="Release Date" required />
        <input className="input" name="imageName" value={form.imageName} onChange={handleChange} placeholder="Image Name" required />
        <button className="button" type="submit">Create</button>
      </form>
      {films.map((film) => (
        <div key={film.id} className="filmCard">
          <h2>{film.title}</h2>
          <p>{film.description}</p>
          <p>{film.releaseDate}</p>
          <p>{film.imageName}</p>
          <button className="button" onClick={() => handleUpdate(film.id)}>Edit</button>
          <button className="button" onClick={() => handleDelete(film.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default FilmsAdmin;