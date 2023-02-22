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
      try {
        const user = axios.post('/api/auth/login', { email, password });
        this.user = user;
        localStorage.setItem('user', JSON.stringify(user));
        const router = useRouter();
        router.push(this.returnUrl || '/movies');
      } catch (err) {
        console.error(err);
      }
    },
    logout() {
      this.user = null;
      localStorage.removeItem('user');
    }
  }
});
