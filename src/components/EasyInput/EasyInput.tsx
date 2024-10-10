import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import React from "react";
import VariableContainer from "@/components/VariableContainer/VariableContainer";
import ModellContainer from "@/components/ModellContainer/ModellContainer";
import DataInputContainer from "@/components/DataInputContainer/DataInputContainer";
import ExportButton from "./ExportButton";
// import ImportButton from "./ImportButton";

export default function EasyInput() {
  return (
    <>
      {/* Import/Export Buttons} */}
      <ExportButton />
      {/* <ImportButton /> */}

      {/* Variablen Feld */}
      <Paper sx={{ my: 3, p: 3 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Variablen
        </Typography>
        <VariableContainer />
      </Paper>

      {/* Modell Feld */}
      <Paper sx={{ my: 3, p: 3 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Modell
        </Typography>
        <ModellContainer />
      </Paper>

      {/* Daten Feld */}
      <Paper sx={{ my: 3, p: 3 }}>
        <Typography variant="h5">Daten</Typography>

        <DataInputContainer />
      </Paper>
    </>
  );
}
