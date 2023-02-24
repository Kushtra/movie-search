import GuestLayout from '@/views/auth/Guest.layout.vue';
import Login from '@/views/auth/Login.view.vue';
import Register from '@/views/auth/Register.view.vue';
import { loginPage, registerPage } from '@/constants/pages';

export const authRoutes = {
  path: '/',
  component: GuestLayout,
  children: [
    { name: loginPage, path: '/login', component: Login },
    { name: registerPage, path: '/register', component: Register }
  ]
};
