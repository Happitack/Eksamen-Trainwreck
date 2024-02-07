const asyncHandler = require('express-async-handler');

const Films = require('../models/filmsModel');

// @desc    Get film
// @route   GET /api/films
const getAllFilms = asyncHandler(async (req, res) => {
  const films = await Films.find();

  res.json(films);
})

// @desc    Get film by ID
// @route   GET /api/films/:id
const getFilmById = asyncHandler(async (req, res) => {
  const film = await Films.findById(req.params.id);

  if (film) {
    res.json(film);
  } else {
    res.status(404).json({ error: 'Film not found' });
  }
})

// @desc    Create new film
// @route   POST /api/films
const createFilm = asyncHandler(async (req, res) => {
  if (!req.body.title || !req.body.description) {
    res.status(400).json({
      error: 'Title and description are required'
    });
  }

  const film = await Films.create({
    title: req.body.title,
    description: req.body.description
  })

  res.status(200).json(film)
})

// @desc    Update film by ID
// @route   PUT /api/films/:id
const updateFilmById = asyncHandler(async (req, res) => {
  const film = await Films.findById(req.params.id)

  if (!film) {
    res.status(404).json({ error: 'Film not found' });
  }

  const updatedFilm = await Films.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  res.status(200).json(updatedFilm)
})

// @desc    Delete film by ID
// @route   DELETE /api/films/:id
const deleteFilmById = asyncHandler(async (req, res) => {
  const film = await Films.findById(req.params.id)

  if (!film) {
    return res.status(404).json({ error: 'Film not found' });
  }

  await Films.findByIdAndDelete(req.params.id)

  res.status(200).json({ id: req.params.id })
})

module.exports = { 
  getAllFilms: getAllFilms,
  getFilmById: getFilmById,
  createFilm: createFilm,
  updateFilmById: updateFilmById,
  deleteFilmById: deleteFilmById 
}
