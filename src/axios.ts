import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/",
  timeout: 10000,
});

// 请求拦截器：添加 token
axiosInstance.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器：处理响应和错误
axiosInstance.interceptors.response.use(
  async (response) => {
    return response.data;
  },

  async (error) => {
    console.log("响应拦截器报错", error);
  },
);

export default axiosInstance;
