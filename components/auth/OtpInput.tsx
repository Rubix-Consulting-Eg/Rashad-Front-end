"use client";

import React, { useState, useEffect, useCallback } from "react";
import OtpInput from "react-otp-input";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslations } from "next-intl";

const RESEND_COOLDOWN = 60;
const MAX_RESEND_ATTEMPTS = 10;
const LOCKOUT_DURATION = 60 * 60 * 1000; // 1 hour in ms
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

interface OtpVerificationProps {
  onComplete: (otp: string) => void;
  onResend: () => Promise<void>;
  isLoading?: boolean;
  error?: string;
}

export function OtpVerification({
  onComplete,
  onResend,
  isLoading = false,
  error,
}: OtpVerificationProps) {
  const t = useTranslations("auth");
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
    if (isLocked) {
      const interval = setInterval(() => {
        const state = getResendState();
        if (!state.lockedUntil || Date.now() >= state.lockedUntil) {
          setIsLocked(false);
          setCanResend(true);
          saveResendState({ attempts: 0, lockedUntil: null });
          clearInterval(interval);
        } else {
          setLockRemaining(
            Math.ceil((state.lockedUntil - Date.now()) / 1000),
          );
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isLocked]);

  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  useEffect(() => {
    if (otp.length === 6) {
      onComplete(otp);
    }
  }, [otp, onComplete]);

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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
      }}
    >
      <Typography variant="h5" fontWeight={700}>
        {t("otpTitle")}
      </Typography>
      <Typography variant="body2" color="text.secondary" textAlign="center">
        {t("otpDescription")}
      </Typography>

      <Box dir="ltr">
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          shouldAutoFocus
          inputType="number"
          renderInput={(props) => (
            <input
              {...props}
              style={{
                width: "48px",
                height: "56px",
                margin: "0 4px",
                fontSize: "24px",
                fontWeight: 700,
                textAlign: "center",
                borderRadius: "8px",
                border: error
                  ? "2px solid #d32f2f"
                  : "2px solid #e0e0e0",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#BE0E5B";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = error ? "#d32f2f" : "#e0e0e0";
              }}
            />
          )}
        />
      </Box>

      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}

      {isLoading && <CircularProgress size={24} />}

      <Box sx={{ textAlign: "center" }}>
        {isLocked ? (
          <Typography variant="body2" color="error">
            {t("otpLocked", { time: formatTime(lockRemaining) })}
          </Typography>
        ) : canResend ? (
          <Button
            onClick={handleResend}
            disabled={resending}
            variant="text"
            sx={{ textTransform: "none" }}
          >
            {resending ? (
              <CircularProgress size={16} sx={{ mr: 1 }} />
            ) : null}
            {t("resendOtp")}
          </Button>
        ) : (
          <Typography variant="body2" color="text.secondary">
            {t("resendIn", { seconds: countdown })}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
