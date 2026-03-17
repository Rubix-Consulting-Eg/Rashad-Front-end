"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { AppButton } from "../shared/AppButton";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const, delay },
});

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 65px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        background:
          "radial-gradient(60% 80% at 50% 100%, #5D052C 0%, rgba(190, 14, 91, 0.12) 55%, transparent 100%)",
        position: "relative",
        overflow: "hidden",
        px: { xs: 2.5, sm: 3, md: 4, lg: 6 },
      }}
    >
      {/* Logo with glow */}
      <motion.div {...fadeUp(0)}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Image
            src="/images/AI Kit Logo.png"
            alt="Rashad AI"
            width={260}
            height={150}
            priority
            style={{
              maxWidth: "min(85vw, 280px)",
              height: "auto",
            }}
          />
        </Box>
      </motion.div>

      {/* Brand name — smaller than tagline */}
      <motion.div {...fadeUp(0.1)}>
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: "1.75rem", sm: "2rem", md: "2.25rem" },
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
            color: "text.primary",
          }}
        >
          {t("brandName")}
        </Typography>
      </motion.div>

      {/* Main tagline — larger, wraps on narrow screens */}
      <motion.div {...fadeUp(0.18)}>
        <Typography
          component="h2"
          sx={{
            fontSize: {
              xs: "1.35rem",
              sm: "1.6rem",
              md: "2rem",
              lg: "2.35rem",
            },
            fontWeight: 700,
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
            maxWidth: { xs: "100%", sm: 520, md: 680 },
            mx: "auto",
            mb: { xs: 2, md: 1.5 },
            color: "text.primary",
          }}
        >
          {t("taglinePre")} <Box component="span">{t("taglineHighlight")}</Box>{" "}
          {t("taglinePost")}
        </Typography>
      </motion.div>

      {/* Description — constrained column, light gray */}
      <motion.div {...fadeUp(0.26)} style={{ width: "100%" }}>
        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            fontSize: { xs: "0.8125rem", sm: "0.875rem", md: "1rem" },
            lineHeight: 1.8,
            maxWidth: { xs: "100%", sm: 540, md: 640 },
            mx: "auto",
            mb: { xs: 3.5, md: 4 },
            px: { xs: 0, sm: 1 },
          }}
        >
          &ldquo;{t("description")}&rdquo;
        </Typography>
      </motion.div>

      {/* CTA: stacked on mobile, side-by-side on desktop */}
      <motion.div {...fadeUp(0.34)} style={{ width: "100%", maxWidth: 640 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 2, sm: 2 },
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AppButton
            component={Link}
            href="/register"
            variant="contained"
            color="primary"
            sx={{
              width: { xs: "100%", sm: "auto" },
              minWidth: { sm: 180 },
              borderRadius: "50px",
              px: { xs: 3, md: 4 },
              py: { xs: 1.25, md: 1.4 },
              fontSize: { xs: "0.9375rem", md: "1rem" },
              fontWeight: 700,
            }}
          >
            {t("getStarted")}
          </AppButton>

          <AppButton
            component={Link}
            href="/explore"
            variant="contained"
            color="secondary"
            sx={{
              width: { xs: "100%", sm: "auto" },
              minWidth: { sm: 180 },
              borderRadius: "50px",
              px: { xs: 3, md: 4 },
              py: { xs: 1.25, md: 1.4 },
              fontSize: { xs: "0.9375rem", md: "1rem" },
              fontWeight: 700,
            }}
          >
            {t("explore")}
          </AppButton>
        </Box>
      </motion.div>
    </Box>
  );
}
