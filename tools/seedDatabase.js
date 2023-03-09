require('dotenv').config();
const axios = require('axios');
const { Client } = require('pg');

const fetchPopularMovies = async () => {
  const { status, data } = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.THE_MOVIE_DB_API_KEY}&language=en-US&page=1`
  );
  if (status !== 200) throw Error('Fetching of popular movies failed');
  return data;
};

const fetchGenres = async () => {
  const { status, data } = await axios.get(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.THE_MOVIE_DB_API_KEY}&language=en-US`
  );
  if (status !== 200) throw Error('Fetching of genres failed');
  return data;
};

const insertMovies = async (movies, client) => {
  let query = `INSERT INTO movie (
      id, created_at, updated_at, adult,
      backdrop_path, title, language,
      description, poster_path, release_date,
      original_title
    ) VALUES`;
  movies.forEach(movie => {
    query = `${query} (
        ${movie.id}, NOW(), NOW(), ${movie.adult},
        '${movie.backdrop_path}', '${movie.title.replaceAll("'", '"')}',
        '${movie.original_language}', '${movie.overview.replaceAll("'", '"')}',
        '${movie.poster_path}', '${movie.release_date}', '${movie.original_title.replaceAll("'", '"')}'
      ),`;
  });
  query = query.substring(0, query.length - 1);
  await client.query(query);
};

const insertGenres = async (genres, client) => {
  let query = `INSERT INTO genre (id, name, created_at, updated_at) VALUES`;
  genres.forEach(genre => {
    query = `${query} (${genre.id}, '${genre.name}', NOW(), NOW()),`;
  });
  query = query.substring(0, query.length - 1);
  await client.query(query);
};

(async () => {
  let client = null;
  try {
    client = new Client({
      user: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE || 'movie'
    });
    await client.connect();
    const [movies, { genres }] = await Promise.all([fetchPopularMovies(), fetchGenres()]);
    await Promise.all([insertMovies(movies.results, client), insertGenres(genres, client)]);
    await client.end();
    console.log('Database was seeded successfully, exiting...');
  } catch (err) {
    if (client !== null) await client.end();
    console.error(err);
  }
})();
