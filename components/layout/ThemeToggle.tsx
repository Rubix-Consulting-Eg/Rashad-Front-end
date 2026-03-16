"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

export function ThemeToggle() {
  return (
    <Tooltip title="Toggle theme" arrow>
      <IconButton
        onClick={() => {}}
        aria-label="Toggle theme"
        size="medium"
        sx={{ color: "text.primary" }}
      >
        <Sun size={20} />
      </IconButton>
    </Tooltip>
  );
}
