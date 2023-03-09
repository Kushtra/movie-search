import { createRouter, createWebHistory } from 'vue-router';
import { authRoutes, userRoutes } from '@/router';
import Home from '@/views/Home.view.vue';

const routes = [
  { name: 'home', path: '/', component: Home },
  { ...authRoutes },
  { ...userRoutes },
  { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({ history: createWebHistory(), routes });

export default router;
