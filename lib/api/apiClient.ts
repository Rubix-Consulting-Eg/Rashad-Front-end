"use client";

import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import Cookies from "js-cookie";

const ACCESS_TOKEN_KEY = "access_token";
const EXPIRES_AT_KEY = "token_expires_at";
const LANG_KEY = "NEXT_LOCALE";

export function getAccessToken(): string | undefined {
  return Cookies.get(ACCESS_TOKEN_KEY);
}

export function getExpiresAt(): string | undefined {
  return Cookies.get(EXPIRES_AT_KEY);
}

export function setTokens(accessToken: string, expiresAt: string) {
  const expDate = new Date(expiresAt);
  const cookieExpDays = Math.max(
    (expDate.getTime() - Date.now()) / 86_400_000,
    1 / 24,
  );

  Cookies.set(ACCESS_TOKEN_KEY, accessToken, {
    secure: true,
    sameSite: "lax",
    expires: cookieExpDays,
  });
  Cookies.set(EXPIRES_AT_KEY, expiresAt, {
    secure: true,
    sameSite: "lax",
    expires: cookieExpDays,
  });
}

export function isTokenValid(): boolean {
  const token = Cookies.get(ACCESS_TOKEN_KEY);
  const expiresAt = Cookies.get(EXPIRES_AT_KEY);
  if (!token || !expiresAt) return false;
  return new Date(expiresAt).getTime() > Date.now();
}

export function clearTokens() {
  Cookies.remove(ACCESS_TOKEN_KEY);
  Cookies.remove(EXPIRES_AT_KEY);
}

const DEFAULT_BASE_URL = "https://rashad.runasp.net/api";

const getBaseURL = () => {
  return process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_BASE_URL;
};

const apiClient = axios.create({
  baseURL: getBaseURL(),
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    // "secret-key": process.env.NEXT_PUBLIC_API_SECRET_KEY ?? "",
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const lang = Cookies.get(LANG_KEY) ?? "en";
    config.headers["Accept-Language"] = lang;

    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => Promise.reject(error),
);

export { apiClient };
