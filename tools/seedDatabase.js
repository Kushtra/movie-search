require('dotenv').config();
const axios = require('axios');
const { Client } = require('pg');

(async () => {
  let client = null;
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.THE_MOVIE_DB_API_KEY}&language=en-US&page=1`
    );
    let query = `INSERT INTO movie(
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
    data.results.forEach(movie => {
      query = `${query} (${movie.id}, NOW(), NOW(), ${movie.adult}, '${movie.backdrop_path}',
      '${movie.title.replaceAll("'", '"')}', '${movie.original_language}', '${movie.overview.replaceAll("'", '"')}', '${
        movie.poster_path
      }',
      '${movie.release_date}', '${movie.original_title.replaceAll("'", '"')}'),`;
    });
    query = query.substring(0, query.length - 1);
    await client.query(query);
    await client.end();
  } catch (err) {
    if (client !== null) await client.end();
    console.error(err);
  }
})();
