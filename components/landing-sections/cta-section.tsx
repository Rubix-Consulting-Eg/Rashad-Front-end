"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { motion, rgba } from "framer-motion";
import { useTranslations } from "next-intl";
import { AppButton } from "../shared/AppButton";
import { useTheme } from "@mui/material/styles";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay },
});

export default function CtaSection() {
  const t = useTranslations("cta");
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        px: { xs: 2.5, sm: 3, md: 4, lg: 6 },
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
        background:
          "linear-gradient(180.17deg, rgba(2, 1, 3, 0) 15.64%, #020103 99.86%)",
      }}
    >
      {/* Grid overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(238, 17, 17, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(209, 29, 29, 0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      <Box sx={{ position: "relative", zIndex: 1 }}>
        <motion.div {...fadeUp(0)}>
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: "1.5rem", sm: "1.85rem", md: "2.5rem" },
              fontWeight: 700,
              color: "text.primary",
              mb: 2,
              maxWidth: 640,
              mx: "auto",
              lineHeight: 1.25,
            }}
          >
            {t("title")}
          </Typography>
        </motion.div>

        <motion.div {...fadeUp(0.1)}>
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: { xs: "0.8125rem", sm: "0.875rem", md: "1rem" },
              maxWidth: 600,
              mx: "auto",
              mb: { xs: 4, md: 5 },
              lineHeight: 1.7,
            }}
          >
            {t("subtitle")}
          </Typography>
        </motion.div>

        <motion.div {...fadeUp(0.2)}>
          <AppButton
            component={Link}
            href="/generate"
            variant="contained"
            color="primary"
            sx={{
              borderRadius: "50px",
              px: { xs: 4, md: 5 },
              py: { xs: 1.4, md: 1.6 },
              fontSize: { xs: "0.9375rem", md: "1.0625rem" },
              fontWeight: 700,
            }}
          >
            {t("button")}
          </AppButton>
        </motion.div>
      </Box>
    </Box>
  );
}
