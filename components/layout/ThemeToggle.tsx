"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { ThemeContext } from "@/components/providers/ThemeProvider";

export function ThemeToggle() {
  return (
    <Tooltip title="Toggle theme" arrow>
      <IconButton
        onClick={() => {
          console.log("toggle theme");
        }}
        aria-label="Toggle theme"
        size="medium"
      >
        <Sun size={20} />
      </IconButton>
    </Tooltip>
  );
}
