"use client";

import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material/styles";

type ButtonColor = ButtonProps["color"];

interface AppButtonProps extends Omit<ButtonProps, "color"> {
  color?: ButtonColor;
  loading?: boolean;
  gradient?: boolean;
}

export function AppButton({
  children,
  color = "primary",
  loading = false,
  gradient = true,
  variant = "contained",
  disabled,
  sx,
  ...props
}: AppButtonProps) {
  const theme = useTheme();

  const palette =
    color && color !== "inherit" ? theme.palette[color] : theme.palette.primary;
  const gradientStyles =
    gradient && variant === "contained"
      ? {
          background:
            color === "primary"
              ? `${theme.palette.primary.main}`
              : `linear-gradient(135deg, ${palette.main}, ${palette.dark})`,
        }
      : {};

  const outlinedPalette =
    color && color !== "inherit" ? theme.palette[color] : theme.palette.primary;
  const outlinedStyles =
    variant === "outlined"
      ? {
          borderColor: outlinedPalette.main,
          color: outlinedPalette.main,
          "&:hover": {
            borderColor: outlinedPalette.light,
            backgroundColor: `${outlinedPalette.main}14`,
          },
        }
      : {};

  return (
    <Button
      color={color}
      variant={variant}
      disabled={disabled || loading}
      sx={{
        fontWeight: 600,
        fontSize: "0.875rem",
        px: 3,
        py: 0.8,
        borderRadius: 6,
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
