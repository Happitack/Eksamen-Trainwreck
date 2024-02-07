const express = require('express');
const router = express.Router();
const filmsController = require('../controllers/filmsController');

// Routes for handling data requests
router.route('/')
    .get(filmsController.getAllFilms)
    .post(filmsController.createFilm);

// Routes for handling data requests by ID
router.route('/:id')
    .get(filmsController.getFilmById)
    .put(filmsController.updateFilmById)
    .delete(filmsController.deleteFilmById);

module.exports = router;