import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/Home.view.vue';
import authRoutes from './auth.routes';
import userRoutes from './users.routes';
import { publicPages } from '@/common/constants';
import { useAuthStore } from '@/stores/auth.store';

const routes = [
  { path: '/', component: HomeView },
  { ...authRoutes },
  { ...userRoutes },
  { path: '/:pathMatch(.*)*', redirect: '/' }
];

export const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach(async to => {
  const isAuthRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();
  if (isAuthRequired && !authStore.user) {
    authStore.returnUrl = to.fullPath;
    return '/login';
  }
});
