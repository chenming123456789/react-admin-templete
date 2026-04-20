import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig
} from "axios";
import { message } from "antd";

interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

// 创建 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  timeout: 10000
});

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在这里添加 token 等逻辑
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;
    // 根据业务代码判断逻辑
    // 后台成功状态码：200 / 0 都算成功
    if (res.code === 200 || res.code === 0) {
      return res; // 返回完整 { code, data, message }
    }
    // 业务错误
    message.error(res.message || "业务请求失败");
    return Promise.reject(new Error(res.message || "Error"));
  },
  (error) => {
    console.error("请求异常：", error);

    // HTTP 状态码错误处理
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        message.error("登录已过期，请重新登录");
        localStorage.clear();
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      } else if (status === 403) {
        message.error("没有权限访问");
      } else if (status === 500) {
        message.error("服务器错误");
      } else {
        message.error(error.message || "请求异常");
      }
    } else {
      message.error("网络异常，请检查连接");
    }
    return Promise.reject(error);
  }
);

export const request = <T = any>(
  config: InternalAxiosRequestConfig
): Promise<T> => {
  return service(config);
};
export default service;
