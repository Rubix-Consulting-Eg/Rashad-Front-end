"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import "swiper/css";

const AGENTS = [
  { key: "agent1" as const, image: "/images/agents/photo1.jpg", color: "#3a0a1e" },
  { key: "agent2" as const, image: "/images/agents/photo2.png", color: "#1a1a2e" },
  { key: "agent3" as const, image: "/images/agents/photo3.jpg", color: "#0d2137" },
  { key: "agent4" as const, image: "/images/agents/photo4.png", color: "#1a2e1a" },
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay },
});

export default function SmartAgents() {
  const t = useTranslations("smartAgents");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, overflow: "hidden" }}>
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

      <motion.div {...fadeUp(0.08)}>
        <Typography
          sx={{
            textAlign: "center",
            color: "text.secondary",
            fontSize: { xs: "0.8125rem", sm: "0.875rem", md: "1rem" },
            maxWidth: 720,
            mx: "auto",
            px: 2,
            lineHeight: 1.7,
          }}
        >
          {t("subtitle1")}
        </Typography>
      </motion.div>

      <motion.div {...fadeUp(0.12)}>
        <Typography
          sx={{
            textAlign: "center",
            color: "text.secondary",
            fontSize: { xs: "0.75rem", sm: "0.8125rem", md: "0.9375rem" },
            maxWidth: 780,
            mx: "auto",
            mb: { xs: 4, md: 5 },
            px: 2,
            lineHeight: 1.7,
          }}
        >
          {t("subtitle2")}
        </Typography>
      </motion.div>

      <motion.div {...fadeUp(0.2)}>
        <Swiper
          key={locale}
          dir={isRtl ? "rtl" : "ltr"}
          modules={[Navigation]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            handleSlideChange(swiper);
          }}
          onSlideChange={handleSlideChange}
          slidesPerView={1.15}
          spaceBetween={12}
          breakpoints={{
            480: { slidesPerView: 1.5, spaceBetween: 14 },
            640: { slidesPerView: 2.2, spaceBetween: 16 },
            900: { slidesPerView: 3, spaceBetween: 18 },
            1200: { slidesPerView: 4, spaceBetween: 20 },
          }}
          style={{ padding: "0 16px" }}
        >
          {AGENTS.map((agent) => (
            <SwiperSlide key={agent.key}>
              <Box
                sx={{
                  position: "relative",
                  borderRadius: 2,
                  overflow: "hidden",
                  aspectRatio: "3 / 4",
                  bgcolor: agent.color,
                  cursor: "pointer",
                  "&:hover img": {
                    transform: "scale(1.12)",
                  },
                  "&:hover .agent-overlay": {
                    opacity: 0.85,
                  },
                  "&:hover .agent-desc": {
                    opacity: 1,
                    transform: "translateY(0)",
                  },
                  "&:hover .agent-label": {
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <Image
                  src={agent.image}
                  alt={t(agent.key)}
                  fill
                  sizes="(max-width: 480px) 85vw, (max-width: 640px) 50vw, (max-width: 900px) 33vw, 25vw"
                  style={{
                    objectFit: "cover",
                    transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                />

                <Box
                  className="agent-overlay"
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.1) 100%)",
                    transition: "opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                    opacity: 0.55,
                  }}
                />

                <Box
                  className="agent-label"
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: { xs: 2, md: 2.5 },
                    transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: "0.625rem", sm: "0.6875rem" },
                      color: "rgba(255,255,255,0.7)",
                      fontWeight: 500,
                      mb: 0.5,
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        width: 16,
                        height: 1,
                        bgcolor: "rgba(255,255,255,0.4)",
                        display: "inline-block",
                      }}
                    />
                    {t("poweredBy")}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                      fontWeight: 700,
                      color: "#fff",
                      lineHeight: 1.3,
                      mb: 0.5,
                    }}
                  >
                    {t(agent.key)}
                  </Typography>

                  {/* Description — revealed on hover */}
                  <Typography
                    className="agent-desc"
                    sx={{
                      fontSize: { xs: "0.7rem", sm: "0.75rem" },
                      color: "rgba(255,255,255,0.7)",
                      lineHeight: 1.55,
                      opacity: 0,
                      transform: "translateY(10px)",
                      transition:
                        "opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1), transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                      maxHeight: 60,
                      overflow: "hidden",
                    }}
                  >
                    {t(`${agent.key}Desc`)}
                  </Typography>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 1.5,
            mt: 3,
            px: { xs: 2, md: 4 },
          }}
        >
          <IconButton
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={isBeginning}
            sx={{
              border: "1.5px solid",
              borderColor: isBeginning ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.4)",
              color: isBeginning ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.8)",
              width: 44,
              height: 44,
              transition: "all 0.2s",
              "&:hover": { borderColor: "rgba(255,255,255,0.7)", color: "#fff" },
            }}
            aria-label="Previous"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </IconButton>
          <IconButton
            onClick={() => swiperRef.current?.slideNext()}
            disabled={isEnd}
            sx={{
              border: "1.5px solid",
              borderColor: isEnd ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.4)",
              color: isEnd ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.8)",
              width: 44,
              height: 44,
              transition: "all 0.2s",
              "&:hover": { borderColor: "rgba(255,255,255,0.7)", color: "#fff" },
            }}
            aria-label="Next"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </IconButton>
        </Box>
      </motion.div>
    </Box>
  );
}
