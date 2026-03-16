"use client";

import Box from "@mui/material/Box";
import Hero from "@/components/landing-sections/hero";
import TrustedOrganizations from "@/components/landing-sections/trusted-organizations";
import SmartAgents from "@/components/landing-sections/smart-agents";
import WhatRashadCanDo from "@/components/landing-sections/what-rashad-can-do";
import CtaSection from "@/components/landing-sections/cta-section";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <Box>
      <Hero />
      <TrustedOrganizations />
      <SmartAgents />
      <WhatRashadCanDo />
      <CtaSection />
      <Footer />
    </Box>
  );
}
