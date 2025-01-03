/*
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, version 2 of the License.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 */

import { useTranslations } from "next-intl";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import ThemeToggle from "./ThemeToggle";
import LocaleSwitcher from "@/components/NavBar/LocaleSwitcher";
import { Divider } from "@mui/material";
import NextORSolverIcon from "../NextORSolverAssets/NextORSolverIcon";

export default function NavBar() {
  const t = useTranslations();

  return (
    <AppBar position="static">
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          {/* Big Navbar Title */}
          <NextORSolverIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
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
          <NextORSolverIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
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
            <Divider orientation="vertical" flexItem sx={{ mr: 1 }} />
            <Typography variant="caption">{t("navbar.description")}</Typography>
          </Box>

          {/* Right Elements */}
          <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
            <ThemeToggle />
            <Box sx={{ width: 10 }} />
            <LocaleSwitcher />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
