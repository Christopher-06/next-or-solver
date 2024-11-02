'use client';  // Hinzufügen, um die Komponente als Client Component zu deklarieren

import React, { FC, useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Link, Container, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Grid2 } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useTranslations } from "next-intl";

 
const Footer: FC = () => {
  const [open, setOpen] = useState(false);
  const t = useTranslations();
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])

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
      {isClient ? 
        <><AppBar position="static" component="footer" color="primary" sx={{ top: 'auto', bottom: 0 }}>
          <Container maxWidth="md">
            <Toolbar sx={{ justifyContent: 'center' }}>
              <Typography variant="body2" color="inherit">
                <Grid2 container spacing={20} justifyContent="center" alignItems="center">
                  <Grid2 display="flex" alignItems="center">
                    {'GitHub'}
                    <Link color="inherit" href="https://github.com/Christopher-06/next-or-solver">
                      <GitHubIcon style={{ fontSize: 40, margin: '6px' }} />
                    </Link>
                  </Grid2>
                  <Grid2>
                    <Link color="inherit" href="#" onClick={handleClickOpen} sx={{ fontSize: 15 }}>
                      {t("footer.footer.about_nors")}
                    </Link>
                  </Grid2>
                  <Grid2>
                    <Link color="inherit" href="#" sx={{ fontSize: 15 }}>
                      {t("footer.footer.imprint")}
                    </Link>
                  </Grid2>
                </Grid2>
              </Typography>
            </Toolbar>
          </Container>
        </AppBar><Dialog open={open} onClose={handleClose} scroll="paper" aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
            <DialogTitle id="scroll-dialog-title">{t("footer.footer.about")}</DialogTitle>
            <DialogContent dividers>
              <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
                {/* Hier können die Lizenzinformationen eingefügt werden. Inhalt ist scrollbar, wenn er länger wird. */}
                <h1>{t("footer.footer.about_nors")}</h1>
                {t("footer.footer.about_nors_text")}
                <br /><br />
                <h1>{t("footer.footer.license")}</h1>
                {t("footer.footer.license_text_1")}
                <Link color="inherit" href="https://github.com/Christopher-06/next-or-solver">
                  {t("footer.footer.license_text_2")}
                </Link>
                <br /><br />
                {t("footer.footer.license_text_3")}
                <Link color="inherit" href="https://www.gnu.org/licenses/old-licenses/gpl-2.0.html">
                  {t("footer.footer.license_text_4")}
                </Link>
                <br /><br />
                <h1>{t("footer.footer.disclaimer")}  </h1>
                {t("footer.footer.disclaimer_text")}
                <br /><br />
                <br /><br />


              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                {t("footer.footer.close")}
              </Button>
            </DialogActions>
          </Dialog></>
      :
        <></>
      }
    </>
  );
};

export default Footer;
