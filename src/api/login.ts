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
  userInfo?: Record<string, unknown>;
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

// 用户列表
export interface UserItem {
  id: number;
  username: string;
  nickName: string;
  email: string;
  phoneNumber: string;
  /** 是否被冻结 */
  isFrozen: boolean;
  /** 头像 URL */
  headPic: string;
  /** 创建时间（后端返回通常是 ISO 字符串） */
  createTime: string;
}
export interface UserSearchResponse {
  totalCount: number;
  users: UserItem[];
}
export interface UserSearchParams {
  pageNo: number;
  pageSize: number;
  username?: string;
  nickName?: string;
  email?: string;
}
export const userSearchApi = async (
  params: UserSearchParams,
): Promise<ApiResponse<UserSearchResponse>> => {
  return await axiosInstance.get("/user/list", { params });
};

//刷新token接口
export interface RefreshTokenParams {
  access_token: string;
  refresh_token: string;
}
export interface RefreshTokenResponse {
  code: number;
  data: RefreshTokenParams;
  message: string;
}
export async function refreshTokenApi(
  refreshToken: string,
): Promise<RefreshTokenResponse> {
  return await axiosInstance.get("/user/refresh", {
    params: {
      refreshToken,
    },
  });
}

export interface FreezeResponse {
  code: number;
  data: boolean;
  message: string;
}
export async function freeze(id: number): Promise<FreezeResponse> {
  return await axiosInstance.get("/user/freeze", {
    params: {
      id,
    },
  });
}

//获取用户信息
export interface UserInfo {
  id: number;
  username: string;
  nickName: string;
  email: string;
  headPic: string;
  phoneNumber: string;
  isFrozen: boolean;
  createTime: number;
}
export interface UserInfoResponse {
  code: number;
  data: UserInfo;
  message: string;
}
export async function getUserInfo(): Promise<UserInfoResponse> {
  return await axiosInstance.get("/user/info");
}

//更新用户信息验证码
export interface UpdateInfoCaptchaResponse {
  code: number;
  data: string;
  message: string;
}
export async function updateInfoCaptcha(): Promise<UpdateInfoCaptchaResponse> {
  return await axiosInstance.get("/user/update/captcha");
}

//更新用户信息
export interface UpdateInfoParams {
  headPic: string;
  nickName: string;
  email: string;
  captcha: string;
}
export interface UpdateInfoResponse {
  code: number;
  data: string;
  message: string;
}
export async function updateInfo(
  params: UpdateInfoParams,
): Promise<UpdateInfoResponse> {
  return await axiosInstance.post("/user/admin/update", params);
}
