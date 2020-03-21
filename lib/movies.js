const sqlite3 = require('sqlite3');
const { splitGenreByLine } = require('../utils/util');
const ALL_GENRES = [
  'Action',
  'Adventure',
  'Animation',
  'Children',
  'Comedy',
  'Crime',
  'Documentary',
  'Drama',
  'Fantasy',
  'Film-Noir',
  'Horror',
  'IMAX',
  'Musical',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Thriller',
  'War',
  'Western'
];

module.exports = class MovieService {
  constructor(store) {
    this.store = store;
    this.db = new sqlite3.Database(this.store);
  }

  static getGenres() {
    return ALL_GENRES;
  }

  getAllMovies(cb) {
    // TODO: Return average ratings, and the movie genre as an array instead of a string
    this.db.all(
      `SELECT r.rating, m.title, m.movieId, m.genres, round(AVG(r.rating), 1) AS averageRating from ratings r 
      JOIN movies m ON r.movieId=m.movieId GROUP BY m.movieId HAVING(COUNT(r.rating) >= 20) ORDER BY r.rating DESC`,
      (err, result) => {
        cb(err, splitGenreByLine(result));
      }
    );
  }

  getMoviesByGenre(genre, cb) {
    // TODO: implement this method to return movies of a specified genre
    this.db.all(
      `SELECT r.rating, m.title, m.movieId, m.genres, round(AVG(r.rating),1) AS averageRating 
      from ratings r JOIN movies m ON r.movieId=m.movieId WHERE m.genres like '%${genre}%' GROUP BY m.movieId`,
      (err, result) => {
        cb(err, splitGenreByLine(result));
      }
    );
  }
  getSpecificMovie(movieId, cb) {
      const query = `select * from movies m, ratings r WHERE m.movieId=${movieId} AND m.movieId=r.movieId ORDER BY r.timestamp DESC LIMIT 5`;
      this.db.all(query, (error, result)=>{
          cb(error, splitGenreByLine(result));
      });
  }
};
