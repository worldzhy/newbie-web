import axios, { type AxiosInstance } from "axios";
import { showToast } from "../mixins";
import { getCookie } from "cookies-next";

const createAxiosInstance = (): AxiosInstance => {
  const token = getCookie("token");
  const options = {
    baseURL: process.env.BASE_URL ?? "",
    timeout: 5000,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  };
  const instance = axios.create(options);

  // Add error handler on request interceptor
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const { response } = error;
      const msg = response?.data?.message;

      if (msg) {
        showToast("error", msg);
      }
      if (response?.status === 401) {
        window.location = "/" as string & Location;
      }
      return Promise.reject(error);
    }
  );
  return instance;
};

export default createAxiosInstance();
