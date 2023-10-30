import axios from 'axios';
// config
import { api } from '../config';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL:  api.basepath.main });
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export const axiosInstanceUam = axios.create({ baseURL: api.basepath.uam });

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
