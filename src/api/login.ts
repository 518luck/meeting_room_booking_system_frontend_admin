import axiosInstance from "@/axios";

/** 登录请求参数 */
export interface LoginParams {
  username: string;
  password: string;
}

/** 登录成功时的具体数据结构 */
export interface LoginData {
  accessToken: string;
  refreshToken: string;
  // 使用 Record<string, unknown> 代替 any，表示这是一个对象但属性类型待定
  userInfo: Record<string, unknown>;
}

/** * 统一响应包装结构
 * T: 成功时的 data 类型
 * E: 错误时的 data 类型，默认为 string
 */
export interface ApiResponse<T, E = string> {
  code: number;
  data: T | E; // 核心：使用联合类型处理 data 的不确定性
  message: string;
}

/**
 * 登录 API
 * 返回值明确：要么是 LoginData 对象，要么是错误描述字符串
 */
export const loginApi = async (
  params: LoginParams,
): Promise<ApiResponse<LoginData>> => {
  return await axiosInstance.post("/user/admin/login", params);
};
