"use client";

import * as React from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

interface ThemeProviderProps {
  children: React.ReactNode;
  attribute?: string;
  defaultTheme?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const muiTheme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: "light",
          primary: { main: "#BE0E5B", light: "", dark: "" },
          secondary: { main: "#00ff00" },
          background: {},
        },
        typography: {
          fontFamily: "inherit",
          fontSize: 16,
        },
        shape: { borderRadius: 8 },
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
