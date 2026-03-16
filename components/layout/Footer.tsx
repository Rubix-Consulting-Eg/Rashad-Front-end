"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

const NAV_LINKS = [
  { key: "home" as const, href: "/" },
  { key: "aboutRashad" as const, href: "/about-rashad" },
  { key: "features" as const, href: "/features" },
  { key: "aboutRubix" as const, href: "/about-rubix" },
] as const;

const LEGAL_LINKS = [
  { key: "privacyPolicy" as const, href: "/privacy" },
  { key: "termsOfUse" as const, href: "/terms" },
] as const;

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        overflow: "hidden",
        pt: { xs: 5, md: 6 },
        pb: 0,
      }}
    >
      {/* Background image with dark overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          backgroundImage: "url('/images/footer-image.png')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          opacity: 0.35,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1800,
          mx: "auto",
          px: { xs: 2, md: 4 },
        }}
      >
        {/* Main footer content */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.5fr 1fr 1fr" },
            gap: { xs: 4, md: 6 },
            pb: { xs: 4, md: 5 },
          }}
        >
          {/* Left column */}
          <Box>
            <Image
              src="/images/logo.png"
              alt="Rubix"
              width={120}
              height={40}
              style={{ height: "auto", maxWidth: 120, marginBottom: 16 }}
            />
            <Typography
              sx={{
                color: "rgba(255,255,255,0.65)",
                fontSize: { xs: "0.8125rem", md: "0.875rem" },
                lineHeight: 1.75,
                maxWidth: 320,
                mb: 3,
              }}
            >
              {t("description")}
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.45)",
                fontSize: "0.75rem",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                mb: 0.5,
              }}
            >
              {t("locationLabel")}
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.8)",
                fontSize: { xs: "1rem", md: "1.125rem" },
                fontWeight: 600,
              }}
            >
              {t("location")}
            </Typography>
          </Box>

          {/* Middle column — Navigation (desktop) */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              gap: 1.5,
            }}
          >
            {NAV_LINKS.map((link) => (
              <Typography
                key={link.key}
                component={Link}
                href={link.href}
                sx={{
                  color: "rgba(255,255,255,0.65)",
                  fontSize: "0.875rem",
                  textDecoration: "none",
                  transition: "color 0.2s",
                  "&:hover": { color: "#fff" },
                  width: "fit-content",
                }}
              >
                {t(link.key)}
              </Typography>
            ))}
          </Box>

          {/* Right column — Legal (desktop) */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              gap: 1.5,
            }}
          >
            {LEGAL_LINKS.map((link) => (
              <Typography
                key={link.key}
                component={Link}
                href={link.href}
                sx={{
                  color: "rgba(255,255,255,0.65)",
                  fontSize: "0.875rem",
                  textDecoration: "none",
                  transition: "color 0.2s",
                  "&:hover": { color: "#fff" },
                  width: "fit-content",
                }}
              >
                {t(link.key)}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* Mobile links */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            flexDirection: "column",
            gap: 1.5,
            pb: 4,
          }}
        >
          {[...NAV_LINKS, ...LEGAL_LINKS].map((link) => (
            <Typography
              key={link.key}
              component={Link}
              href={link.href}
              sx={{
                color: "rgba(255,255,255,0.65)",
                fontSize: "0.9375rem",
                textDecoration: "none",
                transition: "color 0.2s",
                "&:hover": { color: "#fff" },
              }}
            >
              {t(link.key)}
            </Typography>
          ))}
        </Box>

        {/* Divider */}
        <Box sx={{ height: "1px", bgcolor: "rgba(255,255,255,0.1)" }} />

        {/* Bottom bar */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            gap: 2,
            py: { xs: 2.5, md: 3 },
          }}
        >
          <Typography
            sx={{
              color: "rgba(255,255,255,0.45)",
              fontSize: { xs: "0.75rem", md: "0.8125rem" },
            }}
          >
            {t("copyright")}
          </Typography>

          <Box
            component="a"
            href="https://rubixconsult.com"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              px: 2.5,
              py: 1,
              borderRadius: "50px",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.8)",
              fontSize: { xs: "0.8125rem", md: "0.875rem" },
              fontWeight: 500,
              textDecoration: "none",
              transition: "all 0.25s ease",
              "&:hover": {
                borderColor: "rgba(255,255,255,0.35)",
                bgcolor: "rgba(255,255,255,0.05)",
                color: "#fff",
              },
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            {t("visitRubix")}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
