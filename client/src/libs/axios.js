import Axios from 'axios';
// import { useAuthStore } from '@/stores/auth.store';

export const axios = Axios.create();
let refresh = true;
// const authStore = useAuthStore()

axios.interceptors.response.use(
  resp => resp,
  async err => {
    const orgReq = err.config;
    if (err.response.status === 401 && refresh) {
      refresh = false;
      const { status, data } = await axios.post('/api/auth/refresh', {}, { withCredentials: true });
      if (status === 201) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
        return axiosInstance(orgReq);
      }
    }
    refresh = true;
    return err;
  }
);
