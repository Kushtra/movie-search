import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/auth/LoginView.vue';
import MovieView from '../views/MovieView.vue';
import RegisterView from '../views/auth/RegisterView.vue';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  },
  {
    path: '/movies',
    name: 'Movies',
    component: MovieView
  }
];

const router = createRouter({ history: createWebHistory(), routes });

export default router;
