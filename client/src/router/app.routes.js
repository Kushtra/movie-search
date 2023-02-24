import { createRouter, createWebHistory } from 'vue-router';
import { authRoutes, userRoutes } from '@/router';
import { useAuthStore } from '@/stores/auth.store';
import { publicPages, homePage } from '@/constants';
import { Pages } from '@/router/router';
import Home from '@/views/Home.view.vue';

const routes = [
  { name: homePage, path: '/', component: Home },
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
    return Pages.login;
  }
});
