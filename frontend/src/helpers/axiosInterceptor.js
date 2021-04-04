import axios from "axios";
import { authStore } from "../stores/authStore";

axios.interceptors.request.use(
  async (config) => {
    //console.log(`${config.method} ${config.url}`);
    const token = await authStore.token
      ? await authStore.token
      : await authStore.getNewToken();
    //console.log("Request send with token:", token);
    config.headers = Object.assign({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });
    return config;
  },
  (error) => {
    console.log("Interceptor Error", error);
    return Promise.reject(error);
  }
);