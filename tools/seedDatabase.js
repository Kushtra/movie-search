require('dotenv').config();
const axios = require('axios');
const { Client } = require('pg');

(async () => {
  let client = null;
  try {
    const [movies, genres] = await Promise.all([fetchPopularMovies(), fetchGenres()]);
    let movieQuery = `INSERT INTO movie(
        id,
        created_at,
        updated_at,
        adult,
        backdrop_path,
        title,
        language,
        description,
        poster_path,
        release_date,
        original_title
    ) VALUES`;
    client = new Client({
      user: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE || 'movie'
    });
    await client.connect();
    movies.results.forEach(movie => {
      movieQuery = `${movieQuery} (${movie.id}, NOW(), NOW(), ${movie.adult}, '${movie.backdrop_path}',
      '${movie.title.replaceAll("'", '"')}', '${movie.original_language}', '${movie.overview.replaceAll("'", '"')}', '${
        movie.poster_path
      }',
      '${movie.release_date}', '${movie.original_title.replaceAll("'", '"')}'),`;
    });
    movieQuery = movieQuery.substring(0, movieQuery.length - 1);
    await client.movieQuery(movieQuery);
    await client.end();
  } catch (err) {
    if (client !== null) await client.end();
    console.error(err);
  }
})();

const fetchPopularMovies = async () => {
  try {
    const { status, data } = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.THE_MOVIE_DB_API_KEY}&language=en-US&page=1`
    );
    if (status !== 200) throw Error('Fetching of popular movies failed');
    return data;
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const fetchGenres = async () => {
  try {
    const { status, data } = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.THE_MOVIE_DB_API_KEY}&language=en-US`
    );
    if (status !== 200) throw Error('Fetching of genres failed');
    return data;
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
