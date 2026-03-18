"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@/i18n/navigation";
import toast from "react-hot-toast";
import { z } from "zod";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useTheme } from "@mui/material/styles";

import { authApi } from "@/lib/api/auth";
import { AppButton } from "@/components/shared/AppButton";

const STRONG_PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "validation.passwordMinLength")
      .regex(STRONG_PASSWORD_REGEX, "validation.passwordStrength"),
    confirmPassword: z.string().min(1, "validation.required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "validation.passwordMismatch",
    path: ["confirmPassword"],
  });

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

interface ResetPasswordFormProps {
  resetToken: string;
}

export function ResetPasswordForm({ resetToken }: ResetPasswordFormProps) {
  const t = useTranslations("auth");
  const locale = useLocale();
  const theme = useTheme();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const resetMutation = useMutation({
    mutationFn: (data: ResetPasswordValues) =>
      authApi.resetPassword({
        resetToken,
        newPassword: data.password,
        confirmNewPassword: data.confirmPassword,
      }),
    onSuccess: () => {
      toast.success(t("resetPasswordSuccess"));
      router.push("/login");
    },
    onError: (error: unknown) => {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message ?? t("resetPasswordError");
      toast.error(message);
    },
  });

  const onSubmit = (data: ResetPasswordValues) => {
    resetMutation.mutate(data);
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
          {t("resetPasswordTitle")}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {t("resetPasswordSubtitle")}
        </Typography>
      </Box>

      <TextField
        {...register("password")}
        size="small"
        placeholder={t("newPassword")}
        type={showPassword ? "text" : "password"}
        error={!!errors.password}
        helperText={getTranslatedError(errors.password?.message)}
        fullWidth
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment
                position="start"
                sx={{ margin: 0, [locale === "ar" ? "pl" : "pr"]: 1 }}
              >
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

      <TextField
        {...register("confirmPassword")}
        size="small"
        placeholder={t("reEnterPassword")}
        type={showConfirm ? "text" : "password"}
        error={!!errors.confirmPassword}
        helperText={getTranslatedError(errors.confirmPassword?.message)}
        fullWidth
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment
                position="start"
                sx={{ margin: 0, [locale === "ar" ? "pl" : "pr"]: 1 }}
              >
                <Lock size={18} color={theme.palette.text.secondary} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirm(!showConfirm)}
                  edge="end"
                  size="small"
                  sx={{ color: "text.secondary" }}
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <AppButton
        type="submit"
        fullWidth
        loading={resetMutation.isPending}
        size="small"
        color="primary"
      >
        {t("updatePassword")}
      </AppButton>
    </Box>
  );
}
