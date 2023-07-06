import axios, { type AxiosInstance } from "axios";
import { showToast } from "../mixins";
import { getCookie } from "cookies-next";

// Add error handler on request interceptor
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    const msg = response?.data?.message;

    if (msg) {
      showToast("error", msg);
    }
    return Promise.reject(error);
  }
);

const createAxiosInstance = (): AxiosInstance => {
  const token = getCookie("token");
  const options = {
    baseURL: process.env.BASE_URL ?? "",
    timeout: 5000,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  };

  return axios.create(options);
};

export default createAxiosInstance();
