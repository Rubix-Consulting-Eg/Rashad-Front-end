"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@/i18n/navigation";
import toast from "react-hot-toast";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";

import { loginSchema, type LoginFormValues } from "@/lib/validations/auth";
import { authApi } from "@/lib/api/auth";
import { useAuth } from "@/lib/auth/AuthContext";
import { AppButton } from "@/components/shared/AppButton";

export function LoginForm() {
  const t = useTranslations("auth");
  const theme = useTheme();
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormValues) => authApi.login(data),
    onSuccess: async (response) => {
      const { access_token, refresh_token } = response.data.data;
      await login(access_token, refresh_token);
      toast.success(t("loginSuccess"));
      router.push("/");
    },
    onError: (error: unknown) => {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message ?? t("loginError");
      toast.error(message);
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data);
  };

  const getTranslatedError = (msg: string | undefined) => {
    if (!msg) return undefined;
    try {
      return t(msg);
    } catch {
      return msg;
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2.5,
        width: "100%",
      }}
    >
      <Box sx={{ mb: 1 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, color: "text.primary", mb: 0.5 }}
        >
          {t("loginTitle")}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {t("loginSubtitle")}
        </Typography>
      </Box>

      <TextField
        {...register("email")}
        size="small"
        placeholder={t("email")}
        error={!!errors.email}
        helperText={getTranslatedError(errors.email?.message)}
        fullWidth
        dir="ltr"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Mail size={18} color={theme.palette.text.secondary} />
              </InputAdornment>
            ),
          },
        }}
      />

      <TextField
        {...register("password")}
        size="small"
        placeholder={t("password")}
        type={showPassword ? "text" : "password"}
        error={!!errors.password}
        helperText={getTranslatedError(errors.password?.message)}
        fullWidth
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Lock size={18} color={theme.palette.text.secondary} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  size="small"
                  sx={{ color: "text.secondary" }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <FormControlLabel
          control={<Checkbox size="small" />}
          label={
            <Typography variant="body2" sx={{}}>
              {t("rememberMe")}
            </Typography>
          }
          sx={{ m: 0 }}
        />
        <Box
          component={Link}
          href="/forgot-password"
          sx={{
            color: "primary.main",
            fontSize: "0.8rem",
            fontWeight: 500,
            textDecoration: "none",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          {t("forgotPassword")}
        </Box>
      </Box>

      <AppButton
        type="submit"
        fullWidth
        loading={loginMutation.isPending}
        size="small"
      >
        {t("login")}
      </AppButton>

      <Typography
        variant="body2"
        textAlign="center"
        sx={{ color: "text.secondary" }}
      >
        {t("noAccount")}{" "}
        <Box
          component={Link}
          href="/register"
          sx={{
            color: "#48888D",
            fontWeight: 500,
            textDecoration: "underline",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          {t("registerNow")}
        </Box>
      </Typography>
    </Box>
  );
}
