"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const PARTNERS = [
  { name: "Partner 1", logo: "/images/logos/logo1.png" },
  { name: "Partner 2", logo: "/images/logos/logo2.png" },
  { name: "Partner 3", logo: "/images/logos/logo3.png" },
  { name: "Partner 4", logo: "/images/logos/logo4.png" },
  { name: "Partner 5", logo: "/images/logos/logo5.png" },
  { name: "Partner 6", logo: "/images/logos/logo6.png" },
  { name: "Partner 1", logo: "/images/logos/logo1.png" },
  { name: "Partner 2", logo: "/images/logos/logo2.png" },
  { name: "Partner 3", logo: "/images/logos/logo3.png" },
  { name: "Partner 4", logo: "/images/logos/logo4.png" },
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay },
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
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            reverseDirection: isRtl,
          }}
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
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: "60%",
                  }}
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    sizes="(max-width: 480px) 45vw, (max-width: 768px) 30vw, (max-width: 1024px) 18vw, 15vw"
                    style={{
                      objectFit: "contain",
                      filter: "brightness(0) invert(1)",
                      opacity: 0.75,
                    }}
                  />
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </Box>
  );
}
