"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay },
});

export default function VideoShowcase() {
  const t = useTranslations("videoShowcase");

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        px: { xs: 2.5, sm: 3, md: 4, lg: 6 },
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(180deg, #3a1623 0%, #21050C 80.07%, #000000 99.51%)",
      }}
    >
      <Box sx={{ position: "relative", zIndex: 1, maxWidth: 1000, mx: "auto" }}>
        <motion.div {...fadeUp(0)}>
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: "1.5rem", sm: "1.85rem", md: "2.5rem" },
              fontWeight: 700,
              textAlign: "center",
              color: "text.primary",
              mb: 1.5,
            }}
          >
            {t("title")}
          </Typography>
        </motion.div>

        <motion.div {...fadeUp(0.1)}>
          <Typography
            sx={{
              textAlign: "center",
              color: "text.secondary",
              fontSize: { xs: "0.8125rem", sm: "0.875rem", md: "1rem" },
              maxWidth: 640,
              mx: "auto",
              mb: { xs: 4, md: 6 },
              lineHeight: 1.7,
            }}
          >
            {t("subtitle")}
          </Typography>
        </motion.div>

        <motion.div {...fadeUp(0.2)}>
          <Box
            sx={{
              position: "relative",
              borderRadius: 4,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.10)",
              background:
                "linear-gradient(135deg, rgba(93,5,44,0.15), rgba(0,0,0,0.3))",
              boxShadow:
                "0 0 60px rgba(233,30,118,0.12), 0 25px 50px rgba(0,0,0,0.4)",
              "&::before": {
                content: '""',
                position: "absolute",
                inset: -1,
                borderRadius: "inherit",
                padding: "1px",
                background:
                  "linear-gradient(135deg, rgba(233,30,118,0.3), transparent 50%, rgba(93,5,44,0.3))",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                pointerEvents: "none",
              },
            }}
          >
            <Box
              sx={{
                position: "relative",
                paddingTop: "56.25%",
                width: "100%",
              }}
            >
              <Box
                component="iframe"
                src="https://www.youtube.com/embed/Hgg7M3kSqyE?si=UtEZT3YNGRObIPwH&rel=0"
                title={t("title")}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
              />
            </Box>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
}
