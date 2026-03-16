"use client";

import Box from "@mui/material/Box";
import Hero from "@/components/landing-sections/hero";
import TrustedOrganizations from "@/components/landing-sections/trusted-organizations";
import SmartAgents from "@/components/landing-sections/smart-agents";

export default function HomePage() {
  return (
    <Box>
      <Hero />
      <TrustedOrganizations />
      <SmartAgents />
    </Box>
  );
}
