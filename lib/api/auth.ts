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
  otpCode: string;
}

export interface ResetPasswordPayload {
  email: string;
  otpCode: string;
  newPassword: string;
  confirmPassword: string;
}

export const authApi = {
  login: (payload: LoginPayload) =>
    apiClient.post<AuthResponse>("/Auth/sign-in", payload),

  register: (payload: RegisterPayload) =>
    apiClient.post<AuthResponse>("/Auth/register", payload),

  getProfile: () => apiClient.get<{ data: User }>("/auth/profile"),

  logout: () => apiClient.post("/auth/logout"),

  resendOtp: (email: string) => apiClient.post("/Auth/resend-otp", { email }),

  verifyOtp: (payload: OtpPayload) =>
    apiClient.post<AuthResponse>("/Auth/verify-otp", payload),

  forgotPassword: (email: string) =>
    apiClient.post("/Auth/forgot-password", { email }),

  verifyResetOtp: (payload: OtpPayload) =>
    apiClient.post("/Auth/verify-reset-otp", payload),

  resetPassword: (payload: ResetPasswordPayload) =>
    apiClient.post("/Auth/reset-password", payload),
};
