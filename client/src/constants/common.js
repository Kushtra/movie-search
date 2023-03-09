export const HTTPStatus = {
  OK: 200,
  CREATED: 201
};

export const getImageUrl = (path, size) =>
  size ? `https://image.tmdb.org/t/p/w${size}${path}` : `https://image.tmdb.org/t/p/original${path}`;
