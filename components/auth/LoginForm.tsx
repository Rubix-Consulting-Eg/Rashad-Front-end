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
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

import { loginSchema, type LoginFormValues } from "@/lib/validations/auth";
import { authApi } from "@/lib/api/auth";
import { useAuth } from "@/lib/auth/AuthContext";

export function LoginForm() {
  const t = useTranslations("auth");
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
        maxWidth: 420,
        mx: "auto",
      }}
    >
      <Typography variant="h5" fontWeight={700} textAlign="center">
        {t("loginTitle")}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        textAlign="center"
        sx={{ mb: 1 }}
      >
        {t("loginSubtitle")}
      </Typography>

      <TextField
        {...register("email")}
        size="small"
        label={t("email")}
        placeholder="name@rubixconsult.com"
        error={!!errors.email}
        helperText={getTranslatedError(errors.email?.message)}
        fullWidth
        dir="ltr"
      />

      <TextField
        {...register("password")}
        size="small"
        label={t("password")}
        type={showPassword ? "text" : "password"}
        error={!!errors.password}
        helperText={getTranslatedError(errors.password?.message)}
        fullWidth
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  size="small"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={loginMutation.isPending}
        sx={{
          py: 1.5,
          textTransform: "none",
          fontWeight: 600,
          fontSize: "1rem",
        }}
      >
        {loginMutation.isPending ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          t("login")
        )}
      </Button>

      <Typography variant="body2" textAlign="center">
        {t("noAccount")}{" "}
        <Box
          component={Link}
          href="/register"
          sx={{
            color: "primary.main",
            fontWeight: 600,
            textDecoration: "none",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          {t("registerNow")}
        </Box>
      </Typography>
    </Box>
  );
}
