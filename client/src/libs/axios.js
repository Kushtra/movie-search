import Axios from 'axios';
import useAuthStore from '@/stores/auth.store';

const axios = Axios.create();

axios.interceptors.request.use(config => {
  const { token } = useAuthStore();
  config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

let errRefresh = true;
axios.interceptors.response.use(
  resp => resp,
  async err => {
    const orgReq = err.config;
    if (err.response.status === 401 && errRefresh) {
      const { refresh } = useAuthStore();
      const token = await refresh();
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      errRefresh = false;
      return axios(orgReq);
    }
    errRefresh = true;
    return err;
  }
);

export default axios;
