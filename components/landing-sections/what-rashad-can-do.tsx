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

const FEATURES = [
  { key: "feature1" as const, icon: "bolt" },
  { key: "feature2" as const, icon: "description" },
  { key: "feature3" as const, icon: "groups" },
  { key: "feature4" as const, icon: "payments" },
  { key: "feature5" as const, icon: "trending_up" },
  { key: "feature6" as const, icon: "account_tree" },
] as const;

const FeatureIcon = ({ icon }: { icon: string }) => {
  const iconMap: Record<string, React.ReactNode> = {
    bolt: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    description: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    groups: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    payments: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    trending_up: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    account_tree: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="18" cy="18" r="3" />
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="6" r="3" />
        <path d="M6 9v6c0 1.1.9 2 2 2h4" />
        <line x1="18" y1="9" x2="18" y2="15" />
      </svg>
    ),
  };
  return <>{iconMap[icon]}</>;
};

export default function WhatRashadCanDo() {
  const t = useTranslations("whatRashadCanDo");

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        px: { xs: 2.5, sm: 3, md: 4, lg: 6 },
      }}
    >
      <motion.div {...fadeUp(0)}>
        <Typography
          component="h2"
          sx={{
            fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2.25rem" },
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
            mb: { xs: 4, md: 5 },
            lineHeight: 1.7,
          }}
        >
          {t("subtitle")}
        </Typography>
      </motion.div>

      <motion.div {...fadeUp(0.2)}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: { xs: 1.5, sm: 2 },
            maxWidth: 900,
            mx: "auto",
          }}
        >
          {FEATURES.map((feature) => (
            <Box
              key={feature.key}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.25,
                px: { xs: 2, sm: 2.5 },
                py: { xs: 1.25, sm: 2 },
                borderRadius: "10px",
                border: "1px solid #ffffff60",
                fontSize: { xs: "0.8125rem", sm: "0.875rem" },
                fontWeight: 500,
                transition: "all 3s ease",
                backdropFilter: "blur(5px)",
                "&:hover": {
                  background:
                    "linear-gradient(90deg, #260312 0%, #8C0B42 100%)",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FeatureIcon icon={feature.icon} />
              </Box>
              {t(feature.key)}
            </Box>
          ))}
        </Box>
      </motion.div>
    </Box>
  );
}
