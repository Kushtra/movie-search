import UserLayout from '@/views/users/User.layout.vue';
import Movie from '@/views/Movie.view.vue';

const userRoutes = {
  path: '/',
  component: UserLayout,
  children: [{ path: '/movies', component: Movie }]
};

export default userRoutes;
