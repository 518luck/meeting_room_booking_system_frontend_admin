import axios, { type AxiosRequestConfig } from "axios";
import { useAuthStore } from "@/stores/auth";
import { refreshTokenApi } from "@/api/login";
import { message } from "antd";

const axiosInstance = axios.create({
  baseURL: "http://1.116.226.29/api",
  timeout: 10000,
});

// 请求拦截器：添加 token
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = useAuthStore.getState().accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器：处理响应和错误
interface PendingTask {
  config: AxiosRequestConfig;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolve: (_: any) => void;
}

let refreshing = false;
const queue: PendingTask[] = [];

axiosInstance.interceptors.response.use(
  // 成功响应：剥开一层data
  async (response) => {
    return response.data;
  },

  async (error) => {
    if (!error.response) return Promise.reject(error);

    const { data, config } = error.response;

    if (config.url.includes("/user/refresh")) {
      refreshing = false;
      queue.length = 0;
      message.error("登录过期，请重新登录");
      window.location.href = "/auth/login";
      return Promise.reject(error);
    }

    if (refreshing) {
      return new Promise((resolve) => {
        queue.push({ config, resolve });
      });
    }

    if (data?.code === 401 && !config.url.includes("/user/refresh")) {
      refreshing = true;

      const refreshToken = useAuthStore.getState().refreshToken;
      const res = await refreshTokenApi(refreshToken);

      if (res.code === 200 || res.code === 201) {
        useAuthStore.getState().setAuth({
          accessToken: res.data.access_token,
          refreshToken: res.data.refresh_token,
        });

        queue.forEach(({ config, resolve }) => {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${res.data.access_token}`;
          resolve(axiosInstance(config));
        });

        config.headers.Authorization = `Bearer ${res.data.access_token}`;
        return axiosInstance(config);
      } else {
        message.error("登录过期，请重新登录");
        setTimeout(() => {
          window.location.href = "/auth/login";
        }, 1500);
      }
    } else {
      message.error(data.message || "请求失败");
      return Promise.reject(error.response.data);
    }
    return error.response.data;
  },
);

export default axiosInstance;
