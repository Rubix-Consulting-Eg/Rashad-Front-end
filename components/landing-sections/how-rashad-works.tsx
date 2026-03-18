"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { motion, px } from "framer-motion";
import { useTranslations } from "next-intl";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay },
});

const STEPS = [
  { number: 1, titleKey: "step1Title" as const, descKey: "step1Desc" as const },
  { number: 2, titleKey: "step2Title" as const, descKey: "step2Desc" as const },
  { number: 3, titleKey: "step3Title" as const, descKey: "step3Desc" as const },
  { number: 4, titleKey: "step4Title" as const, descKey: "step4Desc" as const },
  { number: 5, titleKey: "step5Title" as const, descKey: "step5Desc" as const },
  { number: 6, titleKey: "step6Title" as const, descKey: "step6Desc" as const },
  { number: 7, titleKey: "step7Title" as const, descKey: "step7Desc" as const },
];

export default function HowRashadWorks() {
  const t = useTranslations("howRashadWorks");

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        px: { xs: 2.5, sm: 3, md: 4, lg: 6 },
        position: "relative",
        overflow: "hidden",
        backgroundImage: "url(/images/Contents.png)",
        backgroundSize: "cover",
        backgroundPosition: "center bottom ",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1200,
          mx: "auto",
          minHeight: 300,
        }}
      >
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
              fontSize: { xs: "0.8125rem", sm: "0.875rem", md: "1.2rem" },
              maxWidth: 500,
              mx: "auto",
              mb: { xs: 5, md: 7 },
              lineHeight: 1.7,
            }}
          >
            {t("subtitle")}
          </Typography>
        </motion.div>

        <motion.div {...fadeUp(0.2)}>
          <Grid container spacing={{ xs: 2, md: 2.5 }}>
            {STEPS.map((step) => (
              <Grid key={step.number} size={{ xs: 12, sm: 6, md: 3 }}>
                <StepCard step={step} t={t} />
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Box>
    </Box>
  );
}

function StepCard({
  step,
  t,
}: {
  step: { number: number; titleKey: string; descKey: string };
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <Box
      sx={{
        p: { xs: 2.5, md: 3 },
        borderRadius: 3,
        backdropFilter: "blur(5px)",
        border: "1px solid rgba(255,255,255,0.08)",
        transition: "border-color 0.3s, transform 0.3s, background 0.3s",
        "&:hover": {
          borderColor: "rgba(255,255,255,0.18)",
          bgcolor: "rgba(255,255,255,0.07)",
          transform: "translateY(-4px)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          mb: 1.5,
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            border: "1px solid rgba(255,255,255,0.15)",
            flexShrink: 0,
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "0.875rem",
              color: "white",
            }}
          >
            {step.number}
          </Typography>
        </Box>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: { xs: "0.875rem", md: "0.9375rem" },
            color: "text.primary",
            lineHeight: 1.3,
          }}
        >
          {t(step.titleKey)}
        </Typography>
      </Box>
      <Typography
        sx={{
          color: "text.secondary",
          fontSize: { xs: "0.75rem", md: "0.8125rem" },
          lineHeight: 1.65,
        }}
      >
        {t(step.descKey)}
      </Typography>
    </Box>
  );
}
