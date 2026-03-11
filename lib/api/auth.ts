import { apiClient } from "./apiClient";

export interface User {
  id: string;
  full_name_ar: string;
  full_name_en: string;
  email: string;
  phone: string;
  date_of_birth: string;
  nationality: string;
  gender: "male" | "female";
  avatar?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  full_name_ar: string;
  full_name_en: string;
  email: string;
  phone: string;
  date_of_birth: string;
  nationality: string;
  gender: "male" | "female";
  password: string;
  password_confirmation: string;
}

export interface AuthResponse {
  data: {
    user: User;
    access_token: string;
    refresh_token: string;
  };
  message?: string;
}

export interface OtpPayload {
  email: string;
  otp: string;
}

export const authApi = {
  login: (payload: LoginPayload) =>
    apiClient.post<AuthResponse>("/auth/login", payload),

  register: (payload: RegisterPayload) =>
    apiClient.post<AuthResponse>("/auth/register", payload),

  getProfile: () => apiClient.get<{ data: User }>("/auth/profile"),

  logout: () => apiClient.post("/auth/logout"),

  sendOtp: (email: string) =>
    apiClient.post("/auth/otp/send", { email }),

  verifyOtp: (payload: OtpPayload) =>
    apiClient.post<AuthResponse>("/auth/otp/verify", payload),

  refreshToken: (refreshToken: string) =>
    apiClient.post<AuthResponse>("/auth/refresh", {
      refresh_token: refreshToken,
    }),
};
