"use client";

import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material/styles";

interface AppButtonProps extends Omit<ButtonProps, "color"> {
  loading?: boolean;
  gradient?: boolean;
}

export function AppButton({
  children,
  loading = false,
  gradient = true,
  variant = "contained",
  disabled,
  sx,
  ...props
}: AppButtonProps) {
  const theme = useTheme();

  const gradientStyles =
    gradient && variant === "contained"
      ? {
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        }
      : {};

  const outlinedStyles =
    variant === "outlined"
      ? {
          borderColor: theme.palette.primary.main,
          color: theme.palette.primary.main,
          "&:hover": {
            borderColor: theme.palette.primary.light,
            backgroundColor: "rgba(233, 30, 118, 0.08)",
          },
        }
      : {};

  return (
    <Button
      variant={variant}
      disabled={disabled || loading}
      sx={{
        fontWeight: 500,
        letterSpacing: ".11em",
        fontSize: "1rem",
        borderRadius: 3,
        ...gradientStyles,
        ...outlinedStyles,
        ...sx,
      }}
      {...props}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : children}
    </Button>
  );
}
