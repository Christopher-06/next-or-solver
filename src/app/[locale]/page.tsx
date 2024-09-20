import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Button, Container, Grid2, Stack } from "@mui/material";
import { useTranslations } from "next-intl";
import React from "react";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import VariableContainer from "@/components/VariableContainer/VariableContainer";

export default function Home() {
  const t = useTranslations();
  console.log(t("navbar.title"));

  return (
    <Container maxWidth={false}>
      {/* Variablen Feld */}
      <Paper sx={{ m: 3, p: 3 }}>
        <Typography variant="h5" sx={{mb : 3}}>Variablen</Typography>
        <VariableContainer />
      </Paper>

      {/* Modell Feld */}
      <Paper sx={{ m: 3, p: 3 }}>
        <Typography variant="h5">Modell</Typography>
      </Paper>

      {/* Daten Feld */}
      <Paper sx={{ m: 3, p: 3 }}>
        <Typography variant="h5">Daten</Typography>
      </Paper>

      {/* Actions Bar */}
      <Grid2 container sx={{ px: 3 }} spacing={2}>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Stack direction="row" spacing={2} justifyContent="start">
            <Button variant="contained" color="primary">
              <SystemUpdateAltIcon sx={{ mr: { xs: 0, sm: 1 } }} />
              Export GMLP
            </Button>
            <Button variant="contained" color="primary">
              <SystemUpdateAltIcon sx={{ mr: 1 }} />
              Export LP
            </Button>
            <Button variant="contained" color="primary">
              <SystemUpdateAltIcon sx={{ mr: 1 }} />
              Export MPS
            </Button>
          </Stack>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Stack direction="row" spacing={2} justifyContent="end">
            <Button variant="contained" color="warning">
              Alles Löschen
            </Button>
            <Button variant="contained" color="primary">
              Lösen
            </Button>
          </Stack>
        </Grid2>
      </Grid2>

      {/* Lösungs Feld */}
      <Paper sx={{ m: 3, p: 3 }}>
        <Typography variant="h5">Lösung</Typography>
      </Paper>
    </Container>
  );
}
