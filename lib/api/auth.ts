import { apiClient } from "./apiClient";

export interface User {
  accountId: number;
  fullNameEn: string;
  fullNameAr: string;
  email: string;
  phoneNumber: string;
  gender: string;
  nationality: string;
  createdAt: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  FullNameAr: string;
  FullNameEn: string;
  Email: string;
  PhoneNumber: string;
  Nationality: string;
  Gender: "male" | "female";
  Password: string;
  ConfirmPassword: string;
}

export interface AuthResponse {
  token: string;
  expiresAt: string;
  account: {
    accountId: number;
    fullNameEn: string;
    fullNameAr: string;
    email: string;
    phoneNumber: string;
    gender: string;
    nationality: string;
    createdAt: string;
  };
}

export interface OtpPayload {
  email: string;
  otp: string;
}

export const authApi = {
  login: (payload: LoginPayload) =>
    apiClient.post<AuthResponse>("/Auth/sign-in", payload),

  register: (payload: RegisterPayload) =>
    apiClient.post<AuthResponse>("/Auth/register", payload),

  getProfile: () => apiClient.get<{ data: User }>("/auth/profile"),

  logout: () => apiClient.post("/auth/logout"),

  sendOtp: (email: string) => apiClient.post("/auth/otp/send", { email }),

  verifyOtp: (payload: OtpPayload) =>
    apiClient.post<AuthResponse>("/auth/otp/verify", payload),

};
