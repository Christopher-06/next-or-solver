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

"use client";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useColorScheme } from "@mui/material/styles";
import { useTranslations } from "next-intl";
import { IconButton, Tooltip } from "@mui/material";

const TOGGLE_MAPPING: { [key: string]: JSX.Element } = {
  // current mode : icon to next mode
  dark: <LightModeIcon />,
  system : <LightModeIcon />,
  light: <DarkModeIcon />,
};

export default function ThemeToggle() {
  const t = useTranslations();

  // Get mode
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }

  // Toggle mode
  const handleToggleClick = () => {
    setMode(mode === "dark" ? "light" : "dark");
  };

  return (
    <>
      <Tooltip title={t("navbar.theme_toggle")}>
        <IconButton onClick={handleToggleClick}>
          {TOGGLE_MAPPING[mode]}
        </IconButton>
      </Tooltip>
    </>
  );
}
