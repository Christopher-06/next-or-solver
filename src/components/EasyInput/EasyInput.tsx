import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import React from "react";
import VariableContainer from "@/components/VariableContainer/VariableContainer";
import ModellContainer from "@/components/ModellContainer/ModellContainer";
import { useTranslations } from "next-intl";

export default function EasyInput() {
  const t = useTranslations();
  return (
    <>
      {/* Variablen Feld */}
      <Paper sx={{ my: 3, p: 3 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
        {t("easy_input.easy_input.variables")}
        </Typography>
        <VariableContainer />
      </Paper>

      {/* Modell Feld */}
      <Paper sx={{ my: 3, p: 3 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
        {t("easy_input.easy_input.modell")}
        </Typography>
        <ModellContainer />
      </Paper>

      {/* Daten Feld */}
      <Paper sx={{ my: 3, p: 3 }}>
        <Typography variant="h5">{t("easy_input.easy_input.data")}</Typography>
      </Paper>
    </>
  );
}
