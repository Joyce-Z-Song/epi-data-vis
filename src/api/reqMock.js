import axios from "axios";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

const requests = new axios.create({
  baseURL: "/mock",
});

requests.interceptors.request.use((config) => {
  nprogress.start();
  return config;
});

requests.interceptors.response.use(
  (response) => {
    nprogress.done();
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default requests;
