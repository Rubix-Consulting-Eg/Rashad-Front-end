"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import React from "react";
import { useLocale } from "next-intl";

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
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <Box
      sx={{
        backgroundImage: "url(/images/main-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: {
          xs: isRtl ? "right" : "left",
          md: isRtl ? "left" : "right",
        },
        backgroundRepeat: "no-repeat",
        transform: {
          md: isRtl ? "scaleX(-1)" : "none",
        },
        py: { xs: 2, md: 4 },
      }}
    >
      <Box
        sx={{
          minHeight: "calc(100vh - 68px)",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          width: "95%",
          margin: "0 auto",
          transform: { md: isRtl ? "scaleX(-1)" : "none" },
          overflow: "hidden",
        }}
      >
        {/* Welcome text panel */}
        <Box
          sx={{
            display: "flex",
            flex: { xs: "none", md: 1 },
            flexDirection: "column",
            justifyContent: "center",
            alignItems: { xs: "center", md: "flex-start" },
          }}
        >
          <Box sx={{ maxWidth: 500 }}>
            <Box sx={{ py: { xs: 2, md: 0 } }}>
              <Typography
                variant="h1"
                sx={{
                  color: "text.primary",
                  fontWeight: 700,
                  fontSize: { xs: "1.5rem", md: "2.6rem" },
                  lineHeight: 1.2,
                  mb: { xs: 1, md: 2 },
                  textAlign: { xs: "center", md: "start" },
                }}
              >
                {title}
              </Typography>
              <Typography
                sx={{
                  fontSize: { md: "1rem", lg: "1.2rem" },
                  lineHeight: 1.7,
                  textAlign: { xs: "center", md: "start" },
                }}
              >
                {subtitle}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Form card */}
        <Box
          sx={{
            flex: { xs: "none", md: `0 0 ${wideCard ? "580px" : "500px"}` },
            display: "flex",
            alignItems: { xs: "flex-end", md: "center" },
            justifyContent: "center",
            zIndex: 1,
            my: { xs: 2, md: 0 },
          }}
        >
          <Box
            sx={{
              width: "100%",
              minWidth: { xs: "100%", sm: wideCard ? 500 : 470 },
              backgroundColor: theme.palette.inputBg.main,
              borderRadius: 3,
              p: { md: 4, xs: 3 },
              border: "1px solid",
              borderColor: "divider",
              height: "auto",
              mb: { xs: 2, md: 0 },
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
