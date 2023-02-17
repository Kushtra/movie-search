import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/auth/Login.view.vue';
import MovieView from '../views/MovieView.vue';
import RegisterView from '../views/auth/Register.view.vue';

const routes = [
  {
    path: '/',
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
