import axios from 'axios';
import {showToast} from '../mixins';
import {getCookie} from 'cookies-next';
var qs = require('qs');

const token = getCookie('token');
axios.defaults.baseURL = process.env.BASE_URL ?? '';
axios.defaults.headers.common['Authorization'] = token
  ? `Bearer ${token}`
  : undefined;
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';
axios.defaults.timeout = 5000;
axios.interceptors.response.use(
  response => response,
  error => {
    const {response} = error;
    const msg = response?.data?.message;

    if (msg) {
      showToast('error', msg);
    }
    if (response?.status === 401) {
      window.location = '/' as string & Location;
    }
    return Promise.reject(error);
  }
);

export const postRequest = (url: string, data: object) => {
  return axios.post(url, data);
};

export const listRequest = (url: string, query: object) => {
  return axios.get(url + '?' + qs.stringify(query));
};

export const getRequest = (url: string, resourceId: string) => {
  return axios.get(url + '/' + resourceId);
};

export const patchRequest = (
  url: string,
  resourceId: string | number,
  data: object
) => {
  return axios.patch(url + '/' + resourceId, data);
};

export const deleteRequest = (url: string, resourceId: string | number) => {
  return axios.delete(url + '/' + resourceId);
};

export default axios;
