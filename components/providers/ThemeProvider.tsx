"use client";

import * as React from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

declare module "@mui/material/styles" {
  interface Palette {
    navbar: { main: string };
    inputBg: { main: string };
  }
  interface PaletteOptions {
    navbar?: { main: string };
    inputBg?: { main: string };
  }
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const muiTheme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: "dark",
          primary: {
            main: "#BE0E5B",
            light: "#FF5DA0",
            dark: "#BE0E5B",
          },
          secondary: {
            main: "#BE0E5B",
            light: "#FF79A8",
            dark: "#C60055",
          },
          background: {
            default: "#0A0A0B",
            paper: "#0D0E0D",
          },
          navbar: {
            main: "#0D0D0E",
          },
          inputBg: {
            main: "#0D0E0D",
          },
          text: {
            primary: "#FFFFFF",
            secondary: "#9E9E9E",
          },
          divider: "rgba(255, 255, 255, 0.08)",
        },
        typography: {
          fontFamily: "'DIN Next LT Arabic', sans-serif",
          fontSize: 16,
        },
        shape: { borderRadius: 8 },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                backgroundColor: "#0A0A0B",
                color: "#FFFFFF",
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: "none" as const,
                fontWeight: 600,
                borderRadius: 8,
                fontFamily: "'DIN Next LT Arabic', sans-serif",
              },
              containedPrimary: {
                backgroundColor: "#BE0E5B",
                transition: "all 0.3s ease",
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#171817",
                  borderRadius: 8,
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.1)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.2)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#BE0E5B",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#FFFFFF",
                },
                "& .MuiInputBase-input": {
                  color: "#FFFFFF",
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "#B7B7B9",
                  fontWeight: 400,
                },
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: "none",
              },
            },
          },
          MuiCheckbox: {
            styleOverrides: {
              root: {
                borderRadius: "20px",
                color: "rgba(255, 255, 255, 0.3)",
                "&.Mui-checked": {
                  color: "#BE0E5B",
                },
              },
            },
          },
        },
      }),
    [],
  );

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
