import axios from 'axios';

const axiosInstance = axios.create({
  timeout: 100000,
});

export default axiosInstance;
