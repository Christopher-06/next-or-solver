import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import React from "react";
import VariableContainer from "@/components/VariableContainer/VariableContainer";
import ModellContainer from "@/components/ModellContainer/ModellContainer";

export default function EasyInput() {
  return (
    <>
      {/* Variablen Feld */}
      <Paper sx={{ mb: 3, p: 3 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Variablen
        </Typography>
        <VariableContainer />
      </Paper>

      {/* Modell Feld */}
      <Paper sx={{ mb: 3, p: 3 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Modell
        </Typography>
        <ModellContainer />
      </Paper>

      {/* Daten Feld */}
      <Paper sx={{ mb: 3, p: 3 }}>
        <Typography variant="h5">Daten</Typography>
      </Paper>
    </>
  );
}
