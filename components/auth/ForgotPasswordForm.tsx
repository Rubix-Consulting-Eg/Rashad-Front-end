"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { z } from "zod";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";

import { authApi } from "@/lib/api/auth";
import { AppButton } from "@/components/shared/AppButton";
import { OtpVerification } from "./OtpInput";

const RUBIX_EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@rubixconsult\.com$/i;

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "validation.required")
    .email("validation.invalidEmail")
    .regex(RUBIX_EMAIL_REGEX, "validation.rubixEmailOnly"),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

type Step = "email" | "otp" | "reset";

interface ForgotPasswordFormProps {
  onOtpVerified?: (email: string, otp: string) => void;
}

export function ForgotPasswordForm({ onOtpVerified }: ForgotPasswordFormProps) {
  const t = useTranslations("auth");
  const theme = useTheme();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otpError, setOtpError] = useState<string | undefined>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const sendOtpMutation = useMutation({
    mutationFn: (data: ForgotPasswordValues) =>
      authApi.forgotPassword(data.email),
    onSuccess: (_response, variables) => {
      setEmail(variables.email);
      setStep("otp");
      toast.success(t("otpSent"));
    },
    onError: (error: unknown) => {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message ?? t("forgotPasswordError");
      toast.error(message);
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: (otp: string) =>
      authApi.verifyResetOtp({ email, otpCode: otp }),
    onSuccess: (_response, otp) => {
      onOtpVerified?.(email, otp);
    },
    onError: (error: unknown) => {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message ?? t("otpError");
      setOtpError(message);
    },
  });

  const onSubmit = (data: ForgotPasswordValues) => {
    sendOtpMutation.mutate(data);
  };

  const handleOtpComplete = (otp: string) => {
    setOtpError(undefined);
    verifyOtpMutation.mutate(otp);
  };

  const handleResend = async () => {
    await authApi.forgotPassword(email);
  };

  const getTranslatedError = (msg: string | undefined) => {
    if (!msg) return undefined;
    try {
      return t(msg);
    } catch {
      return msg;
    }
  };

  if (step === "otp") {
    return (
      <OtpVerification
        email={email}
        onComplete={handleOtpComplete}
        onResend={handleResend}
        onBack={() => setStep("email")}
        isLoading={verifyOtpMutation.isPending}
        error={otpError}
      />
    );
  }

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
          {t("forgotPasswordTitle")}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {t("forgotPasswordSubtitle")}
        </Typography>
      </Box>

      <TextField
        {...register("email")}
        size="small"
        placeholder={t("email")}
        error={!!errors.email}
        helperText={getTranslatedError(errors.email?.message)}
        fullWidth
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start" sx={{ paddingRight: 1 }}>
                <Mail size={18} color={theme.palette.text.secondary} />
              </InputAdornment>
            ),
          },
        }}
      />

      <AppButton
        type="submit"
        fullWidth
        loading={sendOtpMutation.isPending}
        size="small"
        color="primary"
      >
        {t("sendOtp")}
      </AppButton>

      <Typography
        component={Link}
        href="/login"
        variant="body2"
        textAlign="center"
        sx={{
          color: "text.secondary",
          textDecoration: "none",
          "&:hover": { color: "text.primary" },
        }}
      >
        {t("backToLogin")}
      </Typography>
    </Box>
  );
}
