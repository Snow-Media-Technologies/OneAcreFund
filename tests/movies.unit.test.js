/* eslint-disable no-undef */
const assert = require('chai').assert;
const path = require('path');
const MovieService = require('../lib/movies');
const movieService = new MovieService(path.join(__dirname, '..', 'movies.db'));

describe('Movies unit tests', () => {
  it('should return many movies', done => {
    movieService.getAllMovies((err, movies) => {
      assert.isAbove(movies.length, 1000);
      done();
    });
  });
  it('should return all movies by a specific genre', done => {
    movieService.getMoviesByGenre('Action', (err, movies) => {
      assert.isAbove(movies.length, 10);
      assert.typeOf(movies, 'array');
      done();
    });
  });
  it('should return details of a specific movie by movie id', done => {
    movieService.getSpecificMovie('1', (err, movie) => {
      assert.typeOf(movie, 'array');
      done();
    });
  });
});
