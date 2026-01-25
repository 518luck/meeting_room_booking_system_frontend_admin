import axiosInstance from "@/axios";

export interface LoginUserRequest {
  username: string;
  password: string;
}

export async function login(username: string, password: string) {
  return await axiosInstance.post("/user/admin/login", {
    username,
    password,
  });
}
