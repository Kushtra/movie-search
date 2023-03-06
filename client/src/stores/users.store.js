import axios from '@/libs/axios';
import { defineStore } from 'pinia';

const useUsersStore = defineStore({
  id: 'users',
  state: () => ({
    users: {},
    user: {}
  }),
  actions: {
    async register(email, password) {
      try {
        const { data } = await axios.post('/api/auth/register', { email, password });
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
      } catch (err) {
        console.error(err);
      }
    }
  }
});

export default useUsersStore;
