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

"use client";
import { Grid2, Typography } from "@mui/material";
import SenseSelector from "./SenseSelector";
import FormularTextField from "../FormularTextField";
import { Sense } from "@/lib/types/Modell";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setObjectiveFormular, setObjectiveSense } from "@/store/slices/Modell";
import { EasyUIObjectiveError } from "@/lib/easy-ui/validation";
import { useTranslations } from "next-intl";

export default function Objective() {
  const dispatch = useDispatch();
  const modell_objective = useSelector(
    (state: RootState) => state.modell.objective_formular
  );
  const modell_sense = useSelector((state: RootState) => state.modell.sense);
  const t = useTranslations();

  const objectionError = useSelector((state: RootState) => {
    const solutionError = state.textFieldInputs.EASY_UI.currentError;
    if (solutionError instanceof EasyUIObjectiveError) {
      return solutionError;
    }
    return null;
  });

  const setSense = (sense: Sense) => {
    dispatch(setObjectiveSense(sense));
  };
  const setObjective = (objective: string) => {
    dispatch(setObjectiveFormular(objective));
  };

  const objectionErrorMessage =
    objectionError?.message.split(":")[
      objectionError?.message.split(":").length - 1
    ];

  return (
    <Grid2 container spacing={2} alignItems="center">
      {/* Sense Selection */}
      <Grid2
        size={{ sm: 12, md: 2 }}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <SenseSelector sense={modell_sense} setSense={setSense} />
      </Grid2>

      {/* Objective Input */}
      <Grid2
        size={{ sm: 12, md: 10 }}
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <FormularTextField
          text={modell_objective}
          setText={setObjective}
          centered={false}
          error={objectionError !== null}
          label={t("modell_container.modell_container.label")}
        />
      </Grid2>

      {/* Error Message */}
      {objectionError && (
        <Grid2 size={{ sm: 12 }}>
          <Typography color="error" variant="caption">
            {objectionErrorMessage}
          </Typography>
        </Grid2>
      )}
    </Grid2>
  );
}
