import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  resp => resp,
  async err => {
    const orgReq = err.config;
    if (err.response.status === 401 && !orgReq._retry) {
      orgReq._retry = true;
      const { status, data } = await axiosInstance.post('/api/auth/refresh', {}, { withCredentials: true });
      if (status === 201) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
        return axiosInstance(orgReq);
      }
    }
    return err;
  }
);

export default axiosInstance;
