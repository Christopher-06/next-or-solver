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
        <Container maxWidth="md"   >
          <Toolbar sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="body2" color="inherit" align="center" sx={{ flexGrow: 1 }}>
              {'Github'}
              <Link color="inherit" href="https://github.com/Christopher-06/next-or-solver">
                <GitHubIcon style={{ fontSize: 40 , marginRight: '200px' }} />
                
              </Link>
              <Link color="inherit" href="#" onClick={handleClickOpen} style={{ fontSize: 15 , marginLeft: '200px' }}>
              Über Next OR Solver
              </Link>
              {/*"    "+new Date().getFullYear()*/}
              
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

      <Dialog open={open} onClose={handleClose} scroll="paper" aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle id="scroll-dialog-title">Über uns</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            {/* Hier können die Lizenzinformationen eingefügt werden. Inhalt ist scrollbar, wenn er länger wird. */}
            <h1>Über Next OR Solver</h1>
            Der Next OR Solver bietet eine benutzerfreundliche Plattform zur Lösung von Optimierungsproblemen.
             Mithilfe der Solver HiGHS und GLPK lassen sich sowohl spezifische als auch allgemeine Modelle effizient lösen.
              Zur Eingabe der Optimierungsprobleme stehen die Formate GMPL, CPLEX LP, MPS und unsere intuitive EASY UI zur Verfügung. 
              Die Modelle können in den verschiedenen Formaten exportiert und importiert werden.
Das Projekt wurde im Rahmen des Moduls Programmierprojekt an der Hochschule Osnabrück von vier Studenten entwickelt, 
mit dem Ziel, eine einfache Möglichkeit zur Lösung von komplexen Optimierungsproblemen zu schaffen.
            <br /><br />
            <h1>Lizenz</h1>
            Diese Webseite verwendet Software, die unter der GNU General Public License Version 2 (GPLv2) lizenziert ist. Der Quellcode dieser Software ist verfügbar unter: {" "}   
            <Link color="inherit" href="https://github.com/Christopher-06/next-or-solver">
              Next OR Solver
              </Link>
               <br /><br/> 
              Weitere Informationen zur Lizenz finden Sie auf der Webseite der Free Software Foundation: {" "}
              <Link color="inherit" href="https://www.gnu.org/licenses/old-licenses/gpl-2.0.html">
              https://www.gnu.org/licenses/old-licenses/gpl-2.0.html
              </Link>
           <br /><br />
          <h1>Haftungsausschluss: </h1> 
          Diese Software wird unter der GNU General Public License Version 2 (GPL v2) bereitgestellt. Sie wird ohne Gewährleistung jeglicher Art, 
          weder ausdrücklich noch stillschweigend, zur Verfügung gestellt. 
          Der Autor übernimmt keine Haftung für Schäden, die direkt oder indirekt aus der Nutzung dieser Software entstehen.
           <br /><br />
           <br /><br />


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
