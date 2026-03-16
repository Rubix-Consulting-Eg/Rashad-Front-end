"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const PARTNERS = [
  { name: "National Center for Government Resources", nameAr: "المركز الوطني لنظم الموارد الحكومية" },
  { name: "Mobily", nameAr: "موبايلي" },
  { name: "Ministry of Education", nameAr: "وزارة التعليم" },
  { name: "Saudi Center for Organ Transplantation", nameAr: "المركز السعودي لزراعة الأعضاء" },
  { name: "Emirate of Jazan Region", nameAr: "إمارة منطقة جازان" },
  { name: "General Authority of Civil Aviation", nameAr: "الهيئة العامة للطيران المدني" },
  { name: "Saudi Data & AI Authority", nameAr: "الهيئة السعودية للبيانات والذكاء الاصطناعي" },
  { name: "Ministry of Human Resources", nameAr: "وزارة الموارد البشرية" },
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const, delay },
});

export default function TrustedOrganizations() {
  const t = useTranslations("trustedOrganizations");
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        background:
          "radial-gradient(60% 50% at 50% 0%, rgba(93, 5, 44, 0.25) 0%, transparent 100%)",
        overflow: "hidden",
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
            px: 2,
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
            maxWidth: 720,
            mx: "auto",
            mb: { xs: 4, md: 6 },
            px: 2,
            lineHeight: 1.7,
          }}
        >
          {t("subtitle")}
        </Typography>
      </motion.div>

      <motion.div {...fadeUp(0.2)}>
        <Swiper
          key={locale}
          dir={isRtl ? "rtl" : "ltr"}
          modules={[Autoplay]}
          autoplay={{ delay: 0, disableOnInteraction: false, reverseDirection: isRtl }}
          speed={4000}
          loop
          slidesPerView={2}
          spaceBetween={16}
          breakpoints={{
            480: { slidesPerView: 3, spaceBetween: 16 },
            768: { slidesPerView: 4, spaceBetween: 20 },
            1024: { slidesPerView: 5, spaceBetween: 24 },
            1280: { slidesPerView: 6, spaceBetween: 24 },
          }}
          style={{ padding: "0 16px" }}
        >
          {PARTNERS.map((partner, i) => (
            <SwiperSlide key={i}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: { xs: 100, md: 120 },
                  borderRadius: 2,
                  bgcolor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  px: 2,
                  transition: "border-color 0.3s, background 0.3s",
                  "&:hover": {
                    borderColor: "rgba(255,255,255,0.15)",
                    bgcolor: "rgba(255,255,255,0.07)",
                  },
                }}
              >
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.85rem" },
                    fontWeight: 600,
                    textAlign: "center",
                    lineHeight: 1.4,
                  }}
                >
                  {partner.nameAr}
                  <Box
                    component="span"
                    sx={{
                      display: "block",
                      fontSize: "0.7rem",
                      fontWeight: 400,
                      mt: 0.5,
                      opacity: 0.7,
                    }}
                  >
                    {partner.name}
                  </Box>
                </Typography>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </Box>
  );
}
