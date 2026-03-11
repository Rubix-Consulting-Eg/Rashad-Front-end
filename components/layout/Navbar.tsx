"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, LogOut } from "lucide-react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { LanguageSwitcher } from "./LanguageSwitcher";
import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthContext";

export function Navbar() {
  const t = useTranslations("nav");
  const { user, isAuthenticated, isLoading } = useAuth();
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
    <motion.div>
      <motion.nav
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.3 }}
        className="direction-ltr"
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
            <Typography
              variant="h1"
              sx={{ color: "primary.main", fontSize: "20px" }}
            >
              {t("logo")}
            </Typography>
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
              <Box component="li" key={link.href}>
                <Box
                  component={Link}
                  href={link.href}
                  key={link.href}
                  style={{ textDecoration: "none" }}
                >
                  {link.label}
                </Box>
              </Box>
            ))}
          </Box>

          {/* Desktop Auth Actions */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 1,
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

          {/* Mobile */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              gap: 1,
            }}
          >
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
        <IconButton onClick={logout} size="small" color="inherit">
          <LogOut size={18} />
        </IconButton>
      </>
    );
  }

  return (
    <>
      <Button
        component={Link}
        href="/login"
        variant="outlined"
        size="small"
        sx={{ textTransform: "none", fontWeight: 600 }}
      >
        {t("login")}
      </Button>
      <Button
        component={Link}
        href="/register"
        variant="contained"
        size="small"
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
        {t("signUp")}
      </Button>
    </>
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
        <Typography variant="body2" sx={{ flex: 1 }}>
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
          sx={{ textTransform: "none" }}
        >
          {t("logout")}
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", gap: 1, width: "100%" }}>
      <Button
        component={Link}
        href="/login"
        onClick={onClose}
        variant="outlined"
        size="small"
        fullWidth
        sx={{ textTransform: "none", fontWeight: 600 }}
      >
        {t("login")}
      </Button>
      <Button
        component={Link}
        href="/register"
        onClick={onClose}
        variant="contained"
        size="small"
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
        {t("signUp")}
      </Button>
    </Box>
  );
}
