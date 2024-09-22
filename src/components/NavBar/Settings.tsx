"use client";
import { useTranslations } from "next-intl";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import SettingsIcon from "@mui/icons-material/Settings";

import ColorModeSelection from "@/components/Theme/ColorModeSelection";
import LocaleSwitcher from "@/components/NavBar/LocaleSwitcher";

export default function NavBar() {
  const t = useTranslations();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenSettingsMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseSettingsMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Tooltip title={t('navbar.settings.tooltip')}>
        <IconButton onClick={handleOpenSettingsMenu} sx={{ p: 0 }}>
          <SettingsIcon />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseSettingsMenu}
      >
        <LocaleSwitcher />
        <Divider />
        <ColorModeSelection />
      </Menu>
    </Box>
  );
}
