'use client';  // Hinzufügen, um die Komponente als Client Component zu deklarieren

import React, { FC, useState } from 'react';
import { AppBar, Toolbar, Typography, Link, Container, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

const Footer: FC = () => {
  const [open, setOpen] = useState(false);

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
      <AppBar position="static" component="footer" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Container maxWidth="md">
          <Toolbar>
            <Typography variant="body2" color="inherit" align="center" sx={{ flexGrow: 1 }}>
              {'Next OR Solver........Copyright © '}
              <Link color="inherit" href="https://github.com/Christopher-06/next-or-solver">
                GitHub
              </Link>{' '}
              <Link color="inherit" href="#" onClick={handleClickOpen}>
                Lizenz
              </Link>{' '}
              {/*new Date().getFullYear()*/}
              {'.'}
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

      <Dialog open={open} onClose={handleClose} scroll="paper" aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle id="scroll-dialog-title">Lizenz</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            {/* Hier können die Lizenzinformationen eingefügt werden. Inhalt ist scrollbar, wenn er länger wird. */}
           Text TExt text
            
            <br /><br />
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
           Mehr TExt
            <br /><br />
           Noch Mehr TExt-----------------------------------------------------------------------------------------------------
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Schließen
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Footer;
