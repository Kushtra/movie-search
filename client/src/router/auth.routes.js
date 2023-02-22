import GuestLayout from '@/views/auth/Guest.layout.vue';
import Login from '@/views/auth/Login.view.vue';
import Register from '@/views/auth/Register.view.vue';

const authRoutes = {
  path: '/',
  component: GuestLayout,
  children: [
    { path: 'login', component: Login },
    { path: 'register', component: Register }
  ]
};

export default authRoutes;
