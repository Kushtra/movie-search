import axios from '@/libs/axios';
import { defineStore } from 'pinia';
import { Pages } from '@/constants';

const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')),
    returnUrl: null
  }),
  actions: {
    async login(formData, router) {
      try {
        const { data, status } = await axios.post('/api/auth/login', formData);
        if (status !== 201) throw Error;
        this.user = data.accessToken;
        localStorage.setItem('user', JSON.stringify(this.user));
        return router.push(this.returnUrl || Pages.movies);
      } catch (err) {
        console.error(err);
      }
    },
    async logout(router) {
      try {
        await axios.delete('/api/auth/logout', { withCredentials: true });
        this.user = null;
        localStorage.removeItem('user');
        return router.push(Pages.login);
      } catch (err) {
        console.error(err);
      }
    }
  }
});

export default useAuthStore;
