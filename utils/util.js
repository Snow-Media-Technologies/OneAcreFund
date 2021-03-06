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

module.exports = {
  splitGenreByLine: function(result) {
    // in this function rating is optional
    // and also average rating in some cases
    const movies = [];
    for (let i in result) {
      const { title, genres, movieId, averageRating, rating, timestamp } = result[i];
      movies.push({
        movieId,
        title,
        genres: genres.split('|'),
        averageRating,
        rating,
        date: new Date(timestamp).toString()
      });
    }
    return movies;
  }
};
