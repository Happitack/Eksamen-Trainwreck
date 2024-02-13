const { body, validationResult } = require('express-validator');
const Films = require('../models/filmsModel');

// Validation rules
exports.validateFilm = [
  body('title', 'Film title is required').trim().isLength({ min: 1, max: 100 }).withMessage('Film title cannot be more than 100 characters'),
  body('description', 'Film description is required').trim().isLength({ min: 1, max: 500 }).withMessage('Film description cannot be more than 500 characters'),
  body('releaseDate', 'Film release date is required').trim().isLength({ min: 1, max: 50 }),
  body('imageName', 'Image name is required').trim().isLength({ min: 1, max: 100 })
]

// desc: Get all films
// route: GET /api/films
exports.getFilms = async (req, res) => {
  const films = await Films.find();
  res.json(films);
};

// desc: Get film by id
// route: GET /api/films/:id
exports.getFilm = async (req, res) => {
  const film = await Film.findById(req.params.id);

  if (!film) {
    return res.status(404).json({ msg: 'Film not found' });
  }
  res.json(film);
};

// desc: Add new film
// route: POST /api/films
exports.createFilm = [
  ...exports.validateFilm,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const film = await Films.create({
        title: req.body.title,
        description: req.body.description,
        releaseDate: req.body.releaseDate,
        imageName: req.body.imageName
      });
      res.status(200).json(film);
    } catch (error) {
      res.status(500).json({ error: 'Could not create film' });
    }
  }
];

// desc: Update film by ID
// route: PUT /api/films/:id
exports.updateFilmById = [
  ...exports.validateFilm,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updatedFilm = await Films.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      if (!updatedFilm) {
        return res.status(404).json({ error: 'Film not found' });
      }
      res.status(200).json(updatedFilm);
    } catch (error) {
      res.status(500).json({ error: 'Could not update film' });
    }
  }
];

exports.deleteFilmById = async (req, res) => {
  try {
    const film = await Films.findById(req.params.id);
    if (!film) {
      return res.status(404).json({ error: 'Film not found' });
    }
    await Films.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: 'Could not delete film' });
  }
};