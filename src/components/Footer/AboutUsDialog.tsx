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
import React, { useState } from "react";
import {
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@mui/material";
import { useTranslations } from "next-intl";
import NextORSolverLogo from "../NextORSolverAssets/NextORSolverLogo";

export default function AbourUsDialog() {
  const [open, setOpen] = useState(false);
  const t = useTranslations();

  // Öffnet das Dialogfenster
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Schließt das Dialogfenster
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Link
        color="inherit"
        href="#"
        onClick={handleClickOpen}
        sx={{ fontSize: 15 }}
      >
        {t("footer.footer.about_nors")}
      </Link>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          {t("footer.footer.about")}
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <NextORSolverLogo
              sx={{ display: "flex", justifyContent: "center", maxHeight : "50vh", maxWidth : "50vh", px : 5 }}
            />

            {/* Hier können die Lizenzinformationen eingefügt werden. Inhalt ist scrollbar, wenn er länger wird. */}
            <h1>{t("footer.footer.about_nors")}</h1>
            {t("footer.footer.about_nors_text")}
            <br />
            <br />
            <h1>{t("footer.footer.license")}</h1>
            {t("footer.footer.license_text_1")}
            <Link
              color="inherit"
              target="_blank"
              href="https://github.com/Christopher-06/next-or-solver"
            >
              {t("footer.footer.license_text_2")}
            </Link>
            <br />
            <br />
            {t("footer.footer.license_text_3")}
            <Link
              color="inherit"
              target="_blank"
              href="https://www.gnu.org/licenses/old-licenses/gpl-2.0.html"
            >
              {t("footer.footer.license_text_4")}
            </Link>
            <br />
            <br />
            <h1>{t("footer.footer.disclaimer")} </h1>
            {t("footer.footer.disclaimer_text")}
            <br />
            <br />
            <br />
            <br />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t("footer.footer.close")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
