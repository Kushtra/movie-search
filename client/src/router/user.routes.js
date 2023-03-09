import UserLayout from '@/views/users/User.layout.vue';
import Movies from '@/views/Movies.view.vue';
import Movie from '@/views/Movie.view.vue';

const userRoutes = {
  path: '/',
  component: UserLayout,
  children: [
    { name: 'movies', path: '/movies', component: Movies },
    { name: 'movie', path: '/movie/:movieId', component: Movie }
  ]
};

export default userRoutes;
