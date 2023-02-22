import axios from '@/libs/axios';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')),
    returnUrl: null
  }),
  actions: {
    async login(email, password) {
      const router = useRouter();
      const user = axios.post('/api/auth/login', { email, password });
      this.user = user;
      localStorage.setItem('user', JSON.stringify(user));
      await router.push('/movies');
    },
    async logout() {
      const router = useRouter();
      this.user = null;
      localStorage.removeItem('user');
      await router.push('/login');
    }
  }
});
