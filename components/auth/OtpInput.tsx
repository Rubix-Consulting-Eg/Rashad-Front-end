"use client";

import React, { useState, useEffect, useCallback } from "react";
import OtpInput from "react-otp-input";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import { AppButton } from "../shared/AppButton";

const RESEND_COOLDOWN = 60;
const MAX_RESEND_ATTEMPTS = 10;
const LOCKOUT_DURATION = 60 * 60 * 1000;
const STORAGE_KEY = "otp_resend_state";

interface ResendState {
  attempts: number;
  lockedUntil: number | null;
}

function getResendState(): ResendState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // corrupted state, reset
  }
  return { attempts: 0, lockedUntil: null };
}

function saveResendState(state: ResendState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!domain) return email;
  if (local.length <= 2) return `${local}***@${domain}`;
  return `${local.slice(0, 2)}${"*".repeat(Math.max(3, local.length - 2))}${local[local.length - 1]}@${domain}`;
}

interface OtpVerificationProps {
  email?: string;
  onComplete: (otp: string) => void;
  onResend: () => Promise<void>;
  onBack?: () => void;
  isLoading?: boolean;
  error?: string;
}

export function OtpVerification({
  email,
  onComplete,
  onResend,
  onBack,
  isLoading = false,
  error,
}: OtpVerificationProps) {
  const t = useTranslations("auth");
  const theme = useTheme();
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(RESEND_COOLDOWN);
  const [canResend, setCanResend] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [lockRemaining, setLockRemaining] = useState(0);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    const state = getResendState();
    if (state.lockedUntil && Date.now() < state.lockedUntil) {
      setIsLocked(true);
      setLockRemaining(Math.ceil((state.lockedUntil - Date.now()) / 1000));
    }
  }, []);

  useEffect(() => {
    if (!isLocked) return;
    const interval = setInterval(() => {
      const state = getResendState();
      if (!state.lockedUntil || Date.now() >= state.lockedUntil) {
        setIsLocked(false);
        setCanResend(true);
        saveResendState({ attempts: 0, lockedUntil: null });
        clearInterval(interval);
      } else {
        setLockRemaining(Math.ceil((state.lockedUntil - Date.now()) / 1000));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isLocked]);

  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleResend = useCallback(async () => {
    const state = getResendState();
    if (state.lockedUntil && Date.now() < state.lockedUntil) {
      setIsLocked(true);
      return;
    }
    const newAttempts = state.attempts + 1;
    if (newAttempts >= MAX_RESEND_ATTEMPTS) {
      const lockedUntil = Date.now() + LOCKOUT_DURATION;
      saveResendState({ attempts: newAttempts, lockedUntil });
      setIsLocked(true);
      setLockRemaining(Math.ceil(LOCKOUT_DURATION / 1000));
      return;
    }
    saveResendState({ attempts: newAttempts, lockedUntil: null });
    setResending(true);
    try {
      await onResend();
      setOtp("");
      setCountdown(RESEND_COOLDOWN);
      setCanResend(false);
    } finally {
      setResending(false);
    }
  }, [onResend]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleVerify = () => {
    if (otp.length === 6) onComplete(otp);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        width: "100%",
      }}
    >
      {/* Title */}
      <Typography
        variant="h5"
        fontWeight={700}
        textAlign="center"
        sx={{ color: "text.primary" }}
      >
        {t("otpTitle")}
      </Typography>

      {/* Subtitle */}
      <Typography variant="body2" color="text.secondary" textAlign="center">
        {t("otpDescription")}
      </Typography>

      {/* OTP inputs — always LTR regardless of locale */}
      <Box dir="ltr" sx={{ my: 0.5 }}>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          shouldAutoFocus
          renderInput={(props) => (
            <input
              {...props}
              style={{
                width: "48px",
                height: "56px",
                margin: "0 5px",
                fontSize: "22px",
                fontWeight: 700,
                textAlign: "center",
                borderRadius: "8px",
                border: error
                  ? "1.5px solid #d32f2f"
                  : "1.5px solid rgba(255,255,255,0.1)",
                background: "#171817",
                color: "#fff",
                outline: "none",
                caretColor: theme.palette.primary.main,
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = theme.palette.primary.main;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = error
                  ? "#d32f2f"
                  : "rgba(255,255,255,0.1)";
              }}
            />
          )}
        />
      </Box>

      {/* Email hint */}
      {email && (
        <Box sx={{ textAlign: "center", px: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {t("otpEmailHint")}{" "}
            <Typography
              component="span"
              variant="body2"
              fontWeight={700}
              color="text.primary"
            >
              {maskEmail(email)}
            </Typography>
            {", "}
            {t("otpEmailHint2")}
          </Typography>
        </Box>
      )}

      {/* Spam note */}
      <Typography variant="body2" color="text.secondary" textAlign="center">
        {t("checkSpamNote")}
      </Typography>

      {/* Change email */}
      {onBack && (
        <Typography
          component="span"
          variant="body2"
          onClick={onBack}
          sx={{
            color: "primary.main",
            cursor: "pointer",
            textDecoration: "underline",
            "&:hover": { opacity: 0.8 },
          }}
        >
          {t("changeEmail")}
        </Typography>
      )}

      {/* Error */}
      {error && (
        <Typography variant="body2" color="error" textAlign="center">
          {error}
        </Typography>
      )}

      {/* Resend / Locked */}
      {isLocked ? (
        <Typography variant="body2" color="error" textAlign="center">
          {t("otpLocked", { time: formatTime(lockRemaining) })}
        </Typography>
      ) : canResend ? (
        <AppButton
          onClick={handleResend}
          disabled={resending}
          color="primary"
          variant="text"
          size="small"
        >
          {resending && (
            <CircularProgress
              size={14}
              sx={{ color: "primary.main", mr: 0.8 }}
            />
          )}
          {t("resendOtp")}
        </AppButton>
      ) : (
        <Typography variant="body2" sx={{ color: "primary.main" }}>
          {t("resendIn", { seconds: countdown })}
        </Typography>
      )}

      {/* Verify button */}
      <AppButton
        onClick={handleVerify}
        disabled={otp.length !== 6 || isLoading}
        color="primary"
        variant="contained"
        fullWidth
        size="large"
      >
        {isLoading ? (
          <CircularProgress size={20} sx={{ color: "inherit" }} />
        ) : (
          t("verifyAccount")
        )}
      </AppButton>

      {/* Back to login */}
      <Typography
        component={Link}
        href="/login"
        variant="body2"
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
