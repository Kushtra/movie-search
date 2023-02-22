import axios from 'axios';
// import { useAuthStore } from '@/stores/auth.store';

const axiosInstance = axios.create();
let refresh = true;
// const authStore = useAuthStore()

axiosInstance.interceptors.response.use(
  resp => resp,
  async err => {
    const orgReq = err.config;
    if (err.response.status === 401 && refresh) {
      refresh = false;
      const { status, data } = await axiosInstance.post('/api/auth/refresh', {}, { withCredentials: true });
      if (status === 201) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
        return axiosInstance(orgReq);
      }
    }
    refresh = true;
    return err;
  }
);

export default axiosInstance;
