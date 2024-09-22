// import Constraint from "@/components/Constraint/Constraint";
// import Variable from "@/components/Variable/Variable";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Button, Container, Grid2, Stack } from "@mui/material";
import { useTranslations } from "next-intl";
import React from "react";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";

export default function CustomInput() {
  const t = useTranslations();
  console.log(t("navbar.title"));

  return (
    <div>
      {/* Variablen Feld */}
      <Paper sx={{ mt: 3, mb: 3, p: 3 }}>
        <Typography variant="h5">Variablen</Typography>
      </Paper>

      {/* Modell Feld */}
      <Paper sx={{ mt: 3, mb: 3, p: 3 }}>
        <Typography variant="h5">Modell</Typography>
      </Paper>

      {/* Daten Feld */}
      <Paper sx={{ mt: 3, mb: 3, p: 3 }}>
        <Typography variant="h5">Daten</Typography>
      </Paper>

      {/* Actions Bar */}
      <Grid2 container>
        <Grid2 size={6}>
          <Stack direction="row" spacing={2} justifyContent="start">
            <Button variant="contained" color="primary">
              <SystemUpdateAltIcon sx={{ mr: 1 }} />
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
        <Grid2 size={6}>
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
      <Paper sx={{ mt: 3, mb: 3, p: 3 }}>
        <Typography variant="h5">Lösung</Typography>
      </Paper>

      {/* <Grid2 container rowSpacing={3} columnSpacing={{xs: 1, sm: 2, md: 3 }}>
        <Card variant="outlined">
          <Variable/>
          <Variable/>
        </Card>
        <Card variant="outlined">
          <Grid2 container rowSpacing={3} columnSpacing={{xs: 1, sm: 2, md: 3 }}>
            <Select labelId="demo-simple-select-standard-label" id="function_type" label={t("input.function_type")} autoWidth defaultValue={0}>
              <MenuItem value={0}>{t("input.function_type.min")}</MenuItem>
              <MenuItem value={1}>{t("input.function_type.max")}</MenuItem>
            </Select>
            <TextField id="function" label={t("input.function")}/>
          </Grid2>
        </Card>
        <Card variant="outlined">
          <Constraint/>
          <Constraint/>
        </Card>
      </Grid2> */}
    </div>
  );
}
