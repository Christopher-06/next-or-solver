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
import { useTranslations } from "next-intl";
import {
  Box,
  Divider,
  IconButton,
  Menu,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { supportedLocales } from "../../i18n";
import { useState } from "react";
import TranslateIcon from "@mui/icons-material/Translate";

const LANGUAGE_MAPPING: { [key: string]: string } = {
  "en-US": "English",
  "de-DE": "Deutsch",
};

export default function LocaleSwitcher() {
  const t = useTranslations();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenLocaleSwitcher = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseLocaleSwitcher = () => {
    setAnchorElUser(null);
  };

  return (
    <Box>
      <Tooltip title={t("navbar.locale_switch")}>
        <IconButton onClick={handleOpenLocaleSwitcher}>
          <TranslateIcon />
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
        open={anchorElUser !== null}
        onClose={handleCloseLocaleSwitcher}
      >
        {supportedLocales.map((item, index) => (
          <Link key={item} locale={false} href={"/" + item}>
            <Typography variant="h5" sx={{ mx: 3 }} textAlign="center">
              {LANGUAGE_MAPPING[item]}
            </Typography>
            {index !== supportedLocales.length - 1 && (
              <Divider sx={{ my: 1 }} />
            )}
          </Link>
        ))}
      </Menu>
    </Box>
  );
}
