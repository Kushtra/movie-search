import UserLayout from '@/views/users/User.layout.vue';
import Movie from '@/views/Movie.view.vue';
import { moviesPage } from '@/constants';

export const userRoutes = {
  path: '/',
  component: UserLayout,
  children: [{ name: moviesPage, path: '/movies', component: Movie }]
};
