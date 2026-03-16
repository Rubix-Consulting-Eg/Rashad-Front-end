"use client";

import * as React from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useLocale } from "next-intl";

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
  const locale = useLocale();
  const direction = locale === "ar" ? "rtl" : "ltr";

  React.useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = locale;
  }, [direction, locale]);

  const muiTheme = React.useMemo(
    () =>
      createTheme({
        direction,
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
                  color: "#fff",
                  "&:-webkit-autofill": {
                    WebkitBoxShadow: "0 0 0 1000px #171817 inset",
                    boxShadow: "0 0 0 1000px #171817 inset",
                    borderRadius: "0",
                  },
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "#fff",
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
                "&.Mui-checked": {
                  color: "#BE0E5B",
                  borderColor: "#BE0E5B",
                  backgroundColor: "transparent",
                  "& .MuiSvgIcon-root": {
                    opacity: 1,
                  },
                },
              },
            },
          },
        },
      }),
    [direction],
  );

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
