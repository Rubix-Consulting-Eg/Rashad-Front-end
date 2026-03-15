"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import React from "react";

interface AuthPageLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  wideCard?: boolean;
}

export function AuthPageLayout({
  title,
  subtitle,
  children,
  wideCard = false,
}: AuthPageLayoutProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        position: "relative",
        backgroundImage: "url(/images/main-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Left: Welcome text panel */}
      <Box
        sx={{
          flex: { xs: "none", md: 1 },
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          p: { md: 6, lg: 8 },
        }}
      >
        <Box sx={{ maxWidth: 500 }}>
          <Box sx={{ mb: 3 }}>
            <Image
              src="/images/logo.png"
              alt="Rubix"
              width={120}
              height={40}
              style={{ objectFit: "contain" }}
              priority
            />
          </Box>
          <Typography
            variant="h1"
            sx={{
              color: "text.primary",
              fontWeight: 700,
              fontSize: { md: "2.2rem", lg: "2.8rem" },
              lineHeight: 1.2,
              mb: 2,
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: { md: "1rem", lg: "1.125rem" },
              lineHeight: 1.7,
              maxWidth: 420,
            }}
          >
            {subtitle}
          </Typography>
        </Box>
      </Box>

      {/* Right: Form card */}
      <Box
        sx={{
          flex: { xs: "none", md: `0 0 ${wideCard ? "580px" : "500px"}` },
          display: "flex",
          alignItems: { xs: "flex-end", md: "center" },
          justifyContent: "center",
          p: { xs: 2, sm: 3, md: 5 },
          minHeight: { xs: "calc(100vh - 64px)", md: "auto" },
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: { xs: "100%", sm: wideCard ? 500 : 440 },
            backgroundColor: theme.palette.inputBg.main,
            borderRadius: 3,
            p: { xs: 3, sm: 4 },
            border: "1px solid",
            borderColor: "divider",
            boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
            height: "auto",
            mb: { xs: 2, md: 0 },
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
