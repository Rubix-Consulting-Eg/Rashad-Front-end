"use client";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Navbar } from "@/components/layout/Navbar";

export default function RegisterPage() {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          py: 4,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 540,
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <RegisterForm />
        </Paper>
      </Box>
    </>
  );
}
