class Pages {
  static movies = { name: 'movies' };
  static login = { name: 'login' };
  static register = { name: 'register' };
  static home = { name: 'home' };
  static movie = movieId => ({ name: 'movie', params: { movieId } });
}

export default Pages;
