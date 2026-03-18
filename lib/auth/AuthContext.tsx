"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "@/lib/api/auth";
import {
  getExpiresAt,
  isTokenValid,
  setTokens,
  clearTokens,
} from "@/lib/api/apiClient";
import toast from "react-hot-toast";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (accessToken: string, expiresAt: string, user: User) => void;
  logout: () => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

function getInitialUser(): User | null {
  if (typeof window === "undefined") return null;
  if (!isTokenValid()) return null;
  try {
    const raw = sessionStorage.getItem("auth_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function persistUser(user: User | null) {
  try {
    if (user) {
      sessionStorage.setItem("auth_user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("auth_user");
    }
  } catch {
    // sessionStorage may be unavailable
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  const queryClient = useQueryClient();
  const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [user, setUserState] = useState<User | null>(getInitialUser);

  const tokenValid = mounted ? isTokenValid() : false;
  const isAuthenticated = tokenValid && user !== null;

  const clearLogoutTimer = useCallback(() => {
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = null;
    }
  }, []);

  const performLogout = useCallback(() => {
    clearLogoutTimer();
    clearTokens();
    setUserState(null);
    persistUser(null);
    queryClient.removeQueries({ queryKey: ["auth"] });
  }, [clearLogoutTimer, queryClient]);

  const scheduleAutoLogout = useCallback(
    (expiresAt: string) => {
      clearLogoutTimer();
      const ms = new Date(expiresAt).getTime() - Date.now();
      const delay = Math.max(ms, 0);
      logoutTimerRef.current = setTimeout(() => {
        performLogout();
        toast.error("Session expired. Please log in again.");
        const locale =
          document.documentElement.lang ||
          window.location.pathname.split("/")[1] ||
          "en";
        window.location.href = `/${locale}/login`;
      }, delay);
    },
    [clearLogoutTimer, performLogout],
  );

  useEffect(() => {
    if (!mounted || !isTokenValid()) return;

    const expiresAt = getExpiresAt()!;
    scheduleAutoLogout(expiresAt);

    return clearLogoutTimer;
  }, [mounted, scheduleAutoLogout, clearLogoutTimer]);

  const login = useCallback(
    (accessToken: string, expiresAt: string, userData: User) => {
      setTokens(accessToken, expiresAt);
      setUserState(userData);
      persistUser(userData);
      queryClient.setQueryData(["auth", "profile"], userData);
      scheduleAutoLogout(expiresAt);
    },
    [queryClient, scheduleAutoLogout],
  );

  const logout = useCallback(() => {
    performLogout();
    toast.success("Logged out successfully");
  }, [performLogout]);

  const setUser = useCallback(
    (newUser: User | null) => {
      setUserState(newUser);
      persistUser(newUser);
      queryClient.setQueryData(["auth", "profile"], newUser);
    },
    [queryClient],
  );

  const isLoading = !mounted;

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated,
      isLoading,
      login,
      logout,
      setUser,
    }),
    [user, isAuthenticated, isLoading, login, logout, setUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
