import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

export default function SppAppBar() {
  return (
    <div className="appbar-wrapper">
      <AppBar>
        <Toolbar>
          <Typography>Service Point Pros</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
