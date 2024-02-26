import React, { useState, useEffect } from 'react';
import { getFilms, createFilm, updateFilm, deleteFilm } from '../../../utils/filmAPI';
import './FilmsAdmin.css';

  // The FilmsAdmin component is a form that allows the user to create, edit, and delete films. The component uses the useState hook to store the films, form, and editingFilm. The component uses the useEffect hook to fetch the films from the server when the component is mounted. The component uses the getFilms, createFilm, updateFilm, and deleteFilm functions from the filmAPI module to interact with the server. The component renders a form with input fields for the title, description, release date, and image name, and a submit button. The component also renders a list of films with buttons to edit and delete each film. The component uses the handleCreate, handleUpdate, handleDelete, handleEdit, and handleChange functions to handle form submission, editing, and deletion.

function FilmsAdmin() {
  const [films, setFilms] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', releaseDate: '', imageName: '' });
  const [editingFilm, setEditingFilm] = useState(null);

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

  const handleUpdate = async (event) => {
    event.preventDefault();
    const response = await updateFilm(editingFilm);
    if (response) {
      setForm({ title: '', description: '', releaseDate: '', imageName: '' });
      fetchFilms();
      setEditingFilm(null);
    }
  };

  const handleDelete = async (id) => {
    await deleteFilm(id);
    fetchFilms();
  };

  const handleEdit = (film) => {
    setEditingFilm(film);
    setForm(film);
  };

  const handleChange = (event) => {
    const updatedForm = { ...form, [event.target.name]: event.target.value };
    setForm(updatedForm);
    if (editingFilm) {
      setEditingFilm(updatedForm);
    }
  };




  return (
    <div className="container">
      <form onSubmit={editingFilm ? handleUpdate : handleCreate} className="form">
        <h2>{editingFilm ? 'Edit Film' : 'Create Film'}</h2>
        <input className="input" name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
        <textarea className="input" name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
        <input className="input" name="releaseDate" value={form.releaseDate} onChange={handleChange} placeholder="Release Date" required />
        <input className="input" name="imageName" value={form.imageName} onChange={handleChange} placeholder="Image Name" required />
        <button className="button" type="submit">{editingFilm ? 'Update' : 'Create'}</button>
      </form>
        <div className="filmsContainer">
          <h2>Film:</h2>
          {films.map((film) => (
            <div key={film._id} className="filmCard">
              <h2>{film.title}</h2>
              <p>{film.releaseDate}</p>
              <p>{film.description}</p>
              <p>{film.imageName}</p>
              <button className="button" onClick={() => handleEdit(film)}>Edit</button>
              <button className="button" onClick={() => handleDelete(film._id)}>Delete</button>
            </div>
          ))}
        </div>
    </div>
  );
}

export default FilmsAdmin;