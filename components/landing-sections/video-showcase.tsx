"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Play } from "lucide-react";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay },
});

export default function VideoShowcase() {
  const t = useTranslations("videoShowcase");
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <motion.div {...fadeUp(0.2)}>
          <Box
            sx={{
              paddingX: 5,
              position: "relative",
              overflow: "hidden",
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
              {!isPlaying ? (
                <Box
                  onClick={() => setIsPlaying(true)}
                  sx={{
                    position: "absolute",
                    inset: 0,
                    cursor: "pointer",
                    "&:hover .play-btn": {
                      transform: "translate(-50%, -50%) scale(1.1)",
                      boxShadow: "0 0 40px rgba(233,30,118,0.5)",
                    },
                  }}
                >
                  <Image
                    src="/images/Video.png"
                    alt={t("title")}
                    fill
                    sizes="(min-width: 1200px) 1200px, 100vw"
                    quality={90}
                    priority
                    style={{ objectFit: "cover" }}
                  />

                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "radial-gradient(circle at center, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 100%)",
                    }}
                  />

                  <Box
                    className="play-btn"
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: { xs: 60, sm: 72, md: 84 },
                      height: { xs: 60, sm: 72, md: 84 },
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, #E91E76 0%, #8C0B42 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 0 30px rgba(233,30,118,0.35)",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    }}
                  >
                    <Play
                      size={32}
                      color="#fff"
                      fill="#fff"
                      style={{ marginLeft: 4 }}
                    />
                  </Box>
                </Box>
              ) : (
                <iframe
                  src="https://www.youtube.com/embed/Hgg7M3kSqyE?si=UtEZT3YNGRObIPwH&rel=0&autoplay=1&loop=1&playlist=Hgg7M3kSqyE"
                  title={t("title")}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: 0,
                  }}
                />
              )}
            </Box>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
}
