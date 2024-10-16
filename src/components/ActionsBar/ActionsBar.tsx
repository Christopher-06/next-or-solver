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
import { useTranslations } from "next-intl";
import { Button, Grid2, Stack } from "@mui/material";
import { Select, MenuItem } from "@mui/material";
import React from "react";
import {
  appendSolutionSolverOutput,
  appendSolutionSolverLog,
  clearSolution,
  setSolution,
  setSolutionError,
  startSolving,
} from "@/store/slices/SolveResults";
import { useDispatch, useSelector } from "react-redux";
import { clearAllVariables } from "@/store/slices/Variables";
import { RootState } from "@/store/store";
import solveHIGHS from "@/lib/highs";
import solveGLPK from "@/lib/glpk_solver";
import ExportButton from "../Editor/ExportButton";
import { FileFormat } from "../Converter/FileFormat";
import { InputType } from "@/store/slices/InputType";
import { setInputError, setTextFieldValue } from "@/store/slices/TextFieldInputs";
import { clearAllModell } from "@/store/slices/Modell";
import ConvertToGMPL from "@/lib/easy-ui/converter";
import { Modell } from "@/lib/types/Modell";
import { Variable } from "@/lib/types/Variable";

const FILEFORMAT_MAP: { [key in InputType]: FileFormat } = {
  GMPL: FileFormat.GMPL,
  CPLEX_LP: FileFormat.CPLEX_LP,
  MPS: FileFormat.MPS,
  EASY_UI: FileFormat.EASY_UI,
};

export default function ActionsBar() {
  const t = useTranslations();
  const dispatch = useDispatch();
  const inputType = useSelector((state: RootState) => state.inputType);
  const textFieldInputs = useSelector(
    (state: RootState) => state.textFieldInputs
  );
  let textFieldValue = textFieldInputs[inputType].textFieldValue;
  let currentFormat = FILEFORMAT_MAP[inputType];
  const [selectedSolver, setSelectedSolver] = React.useState("GLPK");
  const easyUiModell: Modell = useSelector((state: RootState) => state.modell);
  const easyUiVariables: Variable[] = useSelector(
    (state: RootState) => state.variables
  );

  const handleDeleteAllClick = () => {
    dispatch(clearSolution(inputType));

    if (inputType == "EASY_UI") {
      dispatch(clearAllVariables());
      dispatch(clearAllModell());
    } else {
      dispatch(
        setTextFieldValue({
          key: inputType,
          value: "",
        })
      );
    }
  };

  const handleSolveClick = async () => {
    dispatch(startSolving(inputType));

    try {
      // inject conversion from EASY UI to GMPL
      if (inputType == "EASY_UI") {
        console.log("Converting EASY UI to GMPL");
        textFieldValue = ConvertToGMPL(easyUiModell, easyUiVariables, true);
        currentFormat = FileFormat.GMPL;
      }

      if (selectedSolver === "HIGHS") {
        // Run HIGHs solver
        const solution = await solveHIGHS(textFieldValue, currentFormat);
        dispatch(setSolution({ key: inputType, solution }));
      } else if (selectedSolver === "GLPK") {
        // Run GLPK solver
        const solution = solveGLPK(
          textFieldValue,
          currentFormat,
          // Logging function
          (msg) => {
            dispatch(appendSolutionSolverLog({ key: inputType, log: msg }));
          },
          // Output function
          (msg: string) => {
            dispatch(appendSolutionSolverOutput({ key: inputType, out: msg }));
          }
        );
        dispatch(setSolution({ key: inputType, solution }));
      } else {
        // No solver found
        setSolutionError({
          key: inputType,
          error: new Error("Solver nicht gefunden"),
        });
      }

      // clear input error
      dispatch(setInputError({ key: inputType, error: null }));
    } catch (error) {
      console.log("Error while solving", error);
      if (error instanceof Error) {
        dispatch(setSolutionError({ key: inputType, error }));
        dispatch(setInputError({ key: inputType, error }));
      }
    }
  };

  return (
    <>
      <Grid2 container sx={{ px: 3 }} spacing={2}>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Stack direction="row" spacing={2} justifyContent="start">
            <ExportButton
              content={textFieldValue}
              easyUiModell={easyUiModell}
              easyUiVariables={easyUiVariables}
              currentFormat={currentFormat}
              targetFormat={FileFormat.GMPL}
            />
            <ExportButton
              content={textFieldValue}
              easyUiModell={easyUiModell}
              easyUiVariables={easyUiVariables}
              currentFormat={currentFormat}
              targetFormat={FileFormat.CPLEX_LP}
            />
            <ExportButton
              content={textFieldValue}
              easyUiModell={easyUiModell}
              easyUiVariables={easyUiVariables}
              currentFormat={currentFormat}
              targetFormat={FileFormat.MPS}
            />
          </Stack>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }} sx={{ justifyContent: "center" }}>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="end"
            alignItems="center"
          >
            <Button
              variant="contained"
              color="warning"
              onClick={handleDeleteAllClick}
            >
              {t("actions_bar.actions_bar.btn_delete_all")}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSolveClick}
            >
              {t("actions_bar.actions_bar.btn_solve")}
            </Button>

            <Select
              value={selectedSolver}
              onChange={(e) => setSelectedSolver(e.target.value)}
              sx={{ ml: 3 }}
            >
              <MenuItem color="primary" value="HIGHS">
                HIGHS Solver
              </MenuItem>
              <MenuItem value="GLPK">GLPK Solver</MenuItem>
            </Select>
          </Stack>
        </Grid2>
      </Grid2>
    </>
  );
}
