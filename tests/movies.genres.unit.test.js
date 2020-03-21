/* eslint-disable no-undef */
const assert = require('chai').assert;
const path = require('path');
const MovieService = require('../lib/movies');
const movieService = new MovieService(path.join(__dirname, '..', 'movies.db'));

describe('Movies by genre unit tests', () => {
  it('should return all movies by a specific genre', done => {
    movieService.getMoviesByGenre('Action', (err, movies) => {
      if (err) done(err);
      assert.isAbove(movies.length, 1000);
      assert.typeOf(movies, 'array');
      done();
    });
  });
  it('should return details of a specific movie by movie id', done => {
    movieService.getSpecificMovie('1', (err, movie) => {
      if (err) done(err);
      assert.typeOf(movie, 'array');
      done();
    });
  });
});
