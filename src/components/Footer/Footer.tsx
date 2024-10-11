'use client';  // Hinzufügen, um die Komponente als Client Component zu deklarieren

import React, { FC, useState } from 'react';
import { AppBar, Toolbar, Typography, Link, Container, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
 

 
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
                <GitHubIcon style={{ fontSize: 40 }} />
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
            <h1>Über next-or-solver</h1>
            Das Projekt „next-or-solver“ ist eine Next.js-basierte Webanwendung, die in TypeScript entwickelt wurde. 
            Es enthält verschiedene Komponenten, darunter NavBar und Theme, und nutzt Material-UI für das Styling. 
            Die Anwendung scheint sich mit der Lösung von Optimierungsproblemen zu befassen. Um das Projekt zu starten, 
            müssen die Abhängigkeiten mit npm install installiert und der Entwicklungsserver mit npm run dev gestartet werden.
            Weitere Informationen zur Installation, Nutzung und zur Dokumentation von Next.js finden sich im Repository.
            
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
