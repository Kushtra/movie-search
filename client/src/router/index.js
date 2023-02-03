import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import MovieView from '../views/MovieView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/movies',
      name: 'Movies',
      component: MovieView
    },
    {
      path: '/',
      name: 'Home',
      component: HomeView
    }
  ]
});

export default router;
