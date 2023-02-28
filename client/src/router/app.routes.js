import { createRouter, createWebHistory } from 'vue-router';
import { authRoutes, userRoutes } from '@/router';
import { useAuthStore } from '@/stores';
import { Pages, publicPages } from '@/constants';
import Home from '@/views/Home.view.vue';

const routes = [
  { name: 'home', path: '/', component: Home },
  { ...authRoutes },
  { ...userRoutes },
  { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach(async to => {
  const isAuthRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();
  if (isAuthRequired && !authStore.user) {
    authStore.returnUrl = to.fullPath;
    return Pages.login;
  }
});

export default router;
