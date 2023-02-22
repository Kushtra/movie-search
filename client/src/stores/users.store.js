import axios from '@/libs/axios';
import { defineStore } from 'pinia';

export const useUsersStore = defineStore({
  id: 'users',
  state: () => ({
    users: {},
    user: {}
  }),
  actions: {
    async register(userData) {
      try {
        const { data } = await axios.post('/api/auth/register', userData);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
      } catch (err) {
        console.error(err);
      }
    }
  }
});
