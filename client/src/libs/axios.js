import axios from 'axios';

let refresh = false;

axios.interceptors.response.use(
  resp => resp,
  async err => {
    if (err.response.status === 401 && !refresh) {
      refresh = true;
      const { status, data } = await axios.post('refresh', {}, { withCredentials: true });
      if (status === 200) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
        return axios(err.config);
      }
    }
    refresh = false;
    return err;
  }
);
