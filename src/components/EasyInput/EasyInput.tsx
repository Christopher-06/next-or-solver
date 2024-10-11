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

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import React from "react";
import VariableContainer from "@/components/VariableContainer/VariableContainer";
import ModellContainer from "@/components/ModellContainer/ModellContainer";
import { useTranslations } from "next-intl";
import DataInputContainer from "@/components/DataInputContainer/DataInputContainer";
import ExportButton from "./ExportButton";
import ImportButton from "./ImportButton";
import ValidateSometimes from "./ValidateSometimes";

export default function EasyInput() {
  const t = useTranslations();
  return (
    <>
      {/* Import/Export Buttons} */}
      <ExportButton />
      <ImportButton />

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

        <DataInputContainer />
      </Paper>

      {/* Validation Service */}
      <ValidateSometimes />
    </>
  );
}
