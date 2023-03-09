import axios from '@/libs/axios';
import { defineStore } from 'pinia';

const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    token: JSON.parse(localStorage.getItem('token')),
    returnUrl: null
  }),
  actions: {
    async login(formData) {
      const { data } = await axios.post('/api/auth/login', formData);
      this.token = data.accessToken;
      localStorage.setItem('token', JSON.stringify(this.token));
    },
    async refresh() {
      const { data } = await axios.post('/api/auth/refresh', {}, { withCredentials: true });
      this.token = data.accessToken;
      localStorage.setItem('token', JSON.stringify(this.token));
      return this.token;
    },
    async logout() {
      await axios.delete('/api/auth/logout', { withCredentials: true });
      this.token = null;
      localStorage.removeItem('token');
    }
  }
});

export default useAuthStore;
