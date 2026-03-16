"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut } from "lucide-react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "@mui/material/styles";
import { LanguageSwitcher } from "./LanguageSwitcher";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/auth/AuthContext";

export function Navbar() {
  const t = useTranslations("nav");
  const theme = useTheme();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navLinks = [
    { label: t("home"), href: "/" },
    { label: t("aboutRashad"), href: "#about-rashad" },
    { label: t("features"), href: "#features" },
    { label: t("aboutRubix"), href: "#about-rubix" },
  ];

  return (
    <motion.div dir="ltr" style={{ direction: "ltr" }}>
      <motion.nav
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.3 }}
      >
        <Box
          sx={{
            backgroundColor: theme.palette.navbar.main,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Box
            component="nav"
            sx={{
              maxWidth: 1800,
              mx: "auto",
              px: { xs: 2, md: 4 },
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Left: Nav Links */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 4,
              }}
            >
              {navLinks.map((link) => (
                <Box
                  component={Link}
                  href={link.href}
                  key={link.href}
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.875rem",
                    fontWeight: 400,
                    textDecoration: "none",
                    transition: "color 0.2s",
                    whiteSpace: "nowrap",
                    "&:hover": { color: "text.primary" },
                  }}
                >
                  {link.label}
                </Box>
              ))}
            </Box>

            {/* Center: Logo (Desktop only) */}
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
              }}
              className="desktop-logo"
            >
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <Image
                  src="/images/logo.png"
                  alt="Rubix"
                  width={100}
                  height={32}
                  style={{ objectFit: "contain" }}
                  priority
                />
              </Box>
            </Link>

            {/* Right: Language + Auth */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 2,
              }}
            >
              <LanguageSwitcher />
              <AuthButtons
                isAuthenticated={isAuthenticated}
                isLoading={isLoading}
                user={user}
                t={t}
              />
            </Box>

            {/* Mobile: Logo + Hamburger */}
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                alignItems: "center",
                gap: 2,
                width: "100%",
              }}
            >
              <Link
                href="/"
                style={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                }}
              >
                <Image
                  src="/images/logo.png"
                  alt="Rubix"
                  width={80}
                  height={26}
                  style={{ objectFit: "contain" }}
                  priority
                />
              </Link>
              <Box sx={{ marginInlineStart: "auto" }}>
                <IconButton
                  onClick={() => setIsMobileOpen(!isMobileOpen)}
                  aria-label="Toggle menu"
                  sx={{ color: "text.primary" }}
                >
                  {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: "hidden" }}
            >
              <Box
                sx={{
                  backgroundColor: theme.palette.navbar.main,
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  px: 2,
                  py: 3,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                {navLinks.map((link) => (
                  <Box
                    key={link.href}
                    component={Link}
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    sx={{
                      fontSize: "0.95rem",
                      color: "text.secondary",
                      textDecoration: "none",
                      py: 1,
                      px: 1,
                      borderRadius: 1,
                      "&:hover": {
                        color: "text.primary",
                        backgroundColor: "rgba(255,255,255,0.04)",
                      },
                    }}
                  >
                    {link.label}
                  </Box>
                ))}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    pt: 2,
                    borderTop: "1px solid",
                    borderColor: "divider",
                    flexWrap: "wrap",
                  }}
                >
                  <LanguageSwitcher />
                  <MobileAuthButtons
                    isAuthenticated={isAuthenticated}
                    isLoading={isLoading}
                    user={user}
                    t={t}
                    onClose={() => setIsMobileOpen(false)}
                  />
                </Box>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </motion.div>
  );
}

function AuthButtons({
  isAuthenticated,
  isLoading,
  user,
  t,
}: {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: { full_name_en?: string; avatar?: string } | null;
  t: (key: string) => string;
}) {
  const { logout } = useAuth();
  const theme = useTheme();

  if (isLoading) return null;

  if (isAuthenticated && user) {
    return (
      <>
        <Tooltip title={user.full_name_en ?? ""}>
          <Avatar
            src={user.avatar}
            sx={{
              width: 36,
              height: 36,
              bgcolor: "primary.main",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {user.full_name_en?.charAt(0).toUpperCase() ?? "U"}
          </Avatar>
        </Tooltip>
        <IconButton
          onClick={logout}
          size="small"
          sx={{ color: "text.primary" }}
        >
          <LogOut size={18} />
        </IconButton>
      </>
    );
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Button
        component={Link}
        href="/login"
        variant="contained"
        size="small"
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          color: theme.palette.text.primary,
          fontWeight: 600,
          fontSize: "0.875rem",
          px: 3,
          py: 0.8,
          borderRadius: 6,
          "&:hover": {
            background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
          },
        }}
      >
        {t("login")}
      </Button>
      <Box
        component={Link}
        href="/register"
        sx={{
          color: "text.primary",
          fontSize: "0.875rem",
          fontWeight: 500,
          textDecoration: "none",
          whiteSpace: "nowrap",
          "&:hover": { color: "primary.main" },
        }}
      >
        {t("signUp")}
      </Box>
    </Box>
  );
}

function MobileAuthButtons({
  isAuthenticated,
  isLoading,
  user,
  t,
  onClose,
}: {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: { full_name_en?: string; avatar?: string } | null;
  t: (key: string) => string;
  onClose: () => void;
}) {
  const { logout } = useAuth();
  const theme = useTheme();

  if (isLoading) return null;

  if (isAuthenticated && user) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          width: "100%",
        }}
      >
        <Avatar
          src={user.avatar}
          sx={{
            width: 32,
            height: 32,
            bgcolor: "primary.main",
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          {user.full_name_en?.charAt(0).toUpperCase() ?? "U"}
        </Avatar>
        <Typography variant="body2" sx={{ flex: 1, color: "text.primary" }}>
          {user.full_name_en}
        </Typography>
        <Button
          onClick={() => {
            logout();
            onClose();
          }}
          variant="outlined"
          size="small"
          color="error"
          startIcon={<LogOut size={14} />}
        >
          {t("logout")}
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", gap: 1.5, width: "100%" }}>
      <Button
        component={Link}
        href="/login"
        onClick={onClose}
        variant="contained"
        size="small"
        fullWidth
      >
        {t("login")}
      </Button>
      <Button
        component={Link}
        href="/register"
        onClick={onClose}
        variant="outlined"
        size="small"
        fullWidth
      >
        {t("signUp")}
      </Button>
    </Box>
  );
}
