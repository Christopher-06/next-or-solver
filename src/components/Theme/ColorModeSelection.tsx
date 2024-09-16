"use client";
import { useTranslations } from "next-intl";
import * as React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useColorScheme } from "@mui/material/styles";

export default function ColorModeSelection() {
  const t = useTranslations();

  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }

  return (
    <>
      <Select
        value={mode}
        onChange={(event) =>
          setMode(event.target.value as "system" | "light" | "dark")
        }
      >
        <MenuItem value="system">{t("colormode_selection.system")}</MenuItem>
        <MenuItem value="light">{t("colormode_selection.light")}</MenuItem>
        <MenuItem value="dark">{t("colormode_selection.dark")}</MenuItem>
      </Select>
    </>
  );
}
