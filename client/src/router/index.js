import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import MovieView from '../views/MovieView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Movie Search',
      component: MovieView,
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
  ],
});

export default router;
