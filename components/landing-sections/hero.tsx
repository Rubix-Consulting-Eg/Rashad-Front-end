import Box from "@mui/material/Box";
import React from "react";

function hero() {
  return (
    <Box
      sx={{
        height: "calc(100vh - 65px)",
        background:
          "radial-gradient(50% 100% at 50% 100%, #5D052C 0%, rgba(245, 54, 137, 0) 100%)",
      }}
    ></Box>
  );
}

export default hero;
