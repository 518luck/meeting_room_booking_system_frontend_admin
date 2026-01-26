import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LoginData } from "@/api/login";

interface AuthState {
  accessToken: string;
  refreshToken: string;
  userInfo?: Record<string, unknown>;
  setAuth: (data: LoginData) => void;
  clearAuth: () => void;
}

const initialState = {
  accessToken: "",
  refreshToken: "",
  userInfo: {},
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialState,
      setAuth: (data: LoginData) =>
        set({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          userInfo: data.userInfo,
        }),
      clearAuth: () => set(initialState),
    }),
    {
      name: "auth-storage",
    },
  ),
);
