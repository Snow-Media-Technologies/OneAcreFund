let express = require('express');
let router = express.Router();

const path = require('path');
const MovieService = require('../lib/movies');
const movieService = new MovieService(path.join(__dirname, '..', 'movies.db'));

router.get('/movies/all', function(req, res) {
  movieService.getAllMovies((err, movies) => {
    res.json(movies);
  });
});

router.get('/movies/byGenre/:genre', function(req, res) {
  movieService.getMoviesByGenre(req.params.genre, (err, movies) => {
    res.json(movies);
  });
});

// find movie by id
router.get('/movie/:movieId', function(req, res) {
  movieService.getSpecificMovie(req.params.movieId, (error, movie)=>{
    res.status(200).json(movie);
  });
});

module.exports = router;
