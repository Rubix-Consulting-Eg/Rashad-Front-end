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
        py: { xs: 6, md: 10 },
      }}
    >
      {/* Ambient background glow */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          height: "60%",
          background:
            "radial-gradient(ellipse at center, rgba(140,11,66,0.35) 0%, rgba(93,5,44,0.15) 50%, transparent 75%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          px: { xs: 2, sm: 4, md: 8, lg: 12 },
        }}
      >
        <motion.div {...fadeUp(0.2)}>
          {/* Outer frame with perspective tilt */}
          <Box
            sx={{
              position: "relative",
              borderRadius: { xs: "12px", md: "16px" },
              overflow: "hidden",
              background: "rgba(10,10,14,0.85)",
              boxShadow:
                "0 40px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(233,30,118,0.18), 0 0 80px rgba(140,11,66,0.25)",
              "&::before": {
                content: '""',
                position: "absolute",
                inset: 0,
                borderRadius: "inherit",
                padding: "1px",
                background:
                  "linear-gradient(135deg, rgba(233,30,118,0.5) 0%, rgba(140,11,66,0.2) 40%, transparent 70%)",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                pointerEvents: "none",
                zIndex: 2,
              },
            }}
          >
            {/* macOS-style window chrome */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.75,
                px: 2,
                py: 1.25,
                background: "rgba(18,18,24,0.95)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  bgcolor: "#ff5f57",
                }}
              />
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  bgcolor: "#febc2e",
                }}
              />
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  bgcolor: "#28c840",
                }}
              />
            </Box>

            {/* Video area */}
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
                      boxShadow:
                        "0 0 60px rgba(233,30,118,0.6), 0 0 120px rgba(233,30,118,0.25)",
                    },
                  }}
                >
                  <Image
                    src="/images/Video.png"
                    alt={t("title")}
                    fill
                    sizes="(min-width: 1200px) 1100px, 100vw"
                    quality={90}
                    priority
                    style={{ objectFit: "cover" }}
                  />

                  {/* Dark overlay */}
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "radial-gradient(circle at center, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.5) 100%)",
                    }}
                  />

                  {/* Play button */}
                  <Box
                    className="play-btn"
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: { xs: 64, sm: 80, md: 96 },
                      height: { xs: 64, sm: 80, md: 96 },
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.15)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      border: "2px solid rgba(255,255,255,0.35)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow:
                        "0 0 40px rgba(233,30,118,0.35), inset 0 1px 0 rgba(255,255,255,0.2)",
                      transition:
                        "transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease",
                    }}
                  >
                    <Play
                      size={36}
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

          {/* Bottom reflection/glow */}
          <Box
            sx={{
              position: "absolute",
              bottom: -40,
              left: "10%",
              right: "10%",
              height: 40,
              background:
                "radial-gradient(ellipse at center, rgba(140,11,66,0.3) 0%, transparent 70%)",
              filter: "blur(20px)",
              pointerEvents: "none",
            }}
          />
        </motion.div>
      </Box>
    </Box>
  );
}
