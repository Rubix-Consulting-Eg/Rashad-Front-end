"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
// import { ThemeToggle } from "./ThemeToggle";
import Button from "@mui/material/Button";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Navbar() {
  const t = useTranslations("nav");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: t("features"), href: "#features" },
    { label: t("howItWorks"), href: "#how-it-works" },
    { label: t("pricing"), href: "#pricing" },
  ];

  return (
    <Box
      component="header"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 0.3s",
        backdropFilter: isScrolled ? "blur(12px)" : "none",
        bgcolor: isScrolled ? "background.paper" : "transparent",
        borderBottom: isScrolled ? "1px solid" : "none",
        borderColor: "divider",
        boxShadow: isScrolled ? 1 : "none",
      }}
    >
      <Box
        component="nav"
        sx={{
          maxWidth: 1200,
          mx: "auto",
          px: 2,
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontWeight: 700,
            fontSize: 20,
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: 2,
              background: "linear-gradient(135deg, #2563eb, #9333ea)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Sparkles size={16} color="white" />
          </Box>
          <Box
            component="span"
            sx={{
              background: "linear-gradient(to right, #2563eb, #9333ea)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {t("logo")}
          </Box>
        </Link>

        {/* Desktop Nav */}
        <Box
          component="ul"
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 3,
            listStyle: "none",
            m: 0,
            p: 0,
          }}
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <Box
                component="a"
                href={link.href}
                sx={{
                  fontSize: "0.875rem",
                  color: "text.secondary",
                  textDecoration: "none",
                  "&:hover": { color: "text.primary" },
                  transition: "color 0.2s",
                }}
              >
                {link.label}
              </Box>
            </li>
          ))}
        </Box>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 1,
          }}
        >
          <LanguageSwitcher />
          {/* <ThemeToggle /> */}
          <Button
            variant="contained"
            size="small"
            component={Link}
            href="/chat"
            sx={{
              background: "linear-gradient(to right, #2563eb, #9333ea)",
              color: "#fff",
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                background: "linear-gradient(to right, #1d4ed8, #7e22ce)",
              },
            }}
          >
            {t("getStarted")}
          </Button>
        </Box>

        {/* Mobile */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            alignItems: "center",
            gap: 1,
          }}
        >
          {/* <ThemeToggle /> */}
          <IconButton
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
          </IconButton>
        </Box>
      </Box>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              overflow: "hidden",
              borderBottom: "1px solid rgba(0,0,0,0.12)",
            }}
          >
            <Box
              sx={{
                maxWidth: 1200,
                mx: "auto",
                px: 2,
                py: 2,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {navLinks.map((link) => (
                <Box
                  key={link.href}
                  component="a"
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  sx={{
                    fontSize: "0.875rem",
                    color: "text.secondary",
                    textDecoration: "none",
                    py: 0.5,
                    "&:hover": { color: "text.primary" },
                  }}
                >
                  {link.label}
                </Box>
              ))}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  pt: 1,
                  borderTop: "1px solid",
                  borderColor: "divider",
                }}
              >
                <LanguageSwitcher />
                <Button
                  variant="contained"
                  size="small"
                  component={Link}
                  href="/chat"
                  onClick={() => setIsMobileOpen(false)}
                  fullWidth
                  sx={{
                    background: "linear-gradient(to right, #2563eb, #9333ea)",
                    color: "#fff",
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": {
                      background: "linear-gradient(to right, #1d4ed8, #7e22ce)",
                    },
                  }}
                >
                  {t("getStarted")}
                </Button>
              </Box>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
