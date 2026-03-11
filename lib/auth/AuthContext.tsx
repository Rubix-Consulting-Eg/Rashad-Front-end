"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi, User } from "@/lib/api/auth";
import {
  getAccessToken,
  setTokens,
  clearTokens,
} from "@/lib/api/apiClient";
import toast from "react-hot-toast";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (accessToken: string, refreshToken: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    setMounted(true);
  }, []);

  const hasToken = mounted ? !!getAccessToken() : false;

  const {
    data: user,
    isLoading: isProfileLoading,
    isError,
  } = useQuery({
    queryKey: ["auth", "profile"],
    queryFn: async () => {
      const response = await authApi.getProfile();
      return response.data.data;
    },
    enabled: hasToken,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (isError && mounted) {
      clearTokens();
      queryClient.setQueryData(["auth", "profile"], null);
    }
  }, [isError, mounted, queryClient]);

  const login = useCallback(
    async (accessToken: string, refreshToken: string) => {
      setTokens(accessToken, refreshToken);
      await queryClient.invalidateQueries({ queryKey: ["auth", "profile"] });
    },
    [queryClient],
  );

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // Logout endpoint may fail, continue cleanup regardless
    }
    clearTokens();
    queryClient.setQueryData(["auth", "profile"], null);
    queryClient.removeQueries({ queryKey: ["auth", "profile"] });
    toast.success("Logged out successfully");
  }, [queryClient]);

  const setUser = useCallback(
    (newUser: User | null) => {
      queryClient.setQueryData(["auth", "profile"], newUser);
    },
    [queryClient],
  );

  const isLoading = !mounted || (hasToken && isProfileLoading);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: user ?? null,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      setUser,
    }),
    [user, isLoading, login, logout, setUser],
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
