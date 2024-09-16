import { useTranslations } from "next-intl";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AdbIcon from "@mui/icons-material/Adb";

import Settings from "@/components/NavBar/Settings";

export default function NavBar() {
  const t = useTranslations();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Big Navbar Title */}
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {t("navbar.title")}
          </Typography>

          {/* Burger Menue Left (sm) */}
          {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          </Box> */}

          {/* Smaller Navbar Title and Logo  */}
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {t("navbar.title")}
          </Typography>

          {/* Big Navbar Links left */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Typography variant="caption">{t("navbar.description")}</Typography>
          </Box>

          {/* Right Element (Settings) */}
          <Box sx={{ flexGrow: 0 }}>
            <Settings />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
