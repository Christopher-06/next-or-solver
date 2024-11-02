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
import {
  Box,
  Button,
  CircularProgress,
  Tooltip,
  Typography,
} from "@mui/material";
import { Select, MenuItem } from "@mui/material";
import React from "react";
import {
  appendSolutionSolverOutput,
  appendSolutionSolverLog,
  setSolution,
  setSolutionError,
  startSolving,
  SolvingAbortByUserError,
} from "@/store/slices/SolveResults";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { FileFormat } from "../Converter/FileFormat";
import { setInputError } from "@/store/slices/TextFieldInputs";
import ConvertToGMPL from "@/lib/easy-ui/converter";
import { Modell } from "@/lib/types/Modell";
import { Variable } from "@/lib/types/Variable";
import { FILEFORMAT_MAP } from "./ActionsBar";
import useSolveWorker from "@/lib/hooks/useSolveWorker";

export default function SolveAction() {
  const t = useTranslations();
  const dispatch = useDispatch();
  const inputType = useSelector((state: RootState) => state.inputType);
  const textFieldInputs = useSelector(
    (state: RootState) => state.textFieldInputs
  );
  let textFieldValue = textFieldInputs[inputType].textFieldValue;
  let currentFormat = FILEFORMAT_MAP[inputType];
  const [selectedSolver, setSelectedSolver] = React.useState("HIGHS");
  const easyUiModell: Modell = useSelector((state: RootState) => state.modell);
  const easyUiVariables: Variable[] = useSelector(
    (state: RootState) => state.variables
  );

  const onLogCallback = (msg: string) =>
    dispatch(appendSolutionSolverLog({ key: inputType, log: msg }));
  const onOutputCallback = (msg: string) =>
    dispatch(appendSolutionSolverOutput({ key: inputType, out: msg }));

  const [solveWorkerRunning, setSolveWorkerRunning] = React.useState(false);
  const solveWorker = useSolveWorker(
    (msg) => onLogCallback(msg),
    (msg) => onOutputCallback(msg)
  );

  const handleSolveClick = async () => {
    dispatch(startSolving(inputType));
    setSolveWorkerRunning(true);

    try {
      // inject conversion from EASY UI to GMPL
      if (inputType == "EASY_UI") {
        console.log("Converting EASY UI to GMPL");
        textFieldValue = ConvertToGMPL(easyUiModell, easyUiVariables, true);
        currentFormat = FileFormat.GMPL;
      }

      if (selectedSolver === "HIGHS") {
        // Run HIGHs solver
        const solution = await solveWorker.withHIGHS(
          textFieldValue,
          currentFormat
        );
        dispatch(setSolution({ key: inputType, solution }));
      } else if (selectedSolver === "GLPK") {
        // Run GLPK solver
        const solution = await solveWorker.withGLPK(
          textFieldValue,
          currentFormat
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

    setSolveWorkerRunning(false);
  };

  const handleAbortSolverClick = () => {
    solveWorker.worker.restart();
    setSolveWorkerRunning(false);
    dispatch(
      setSolutionError({ key: inputType, error: new SolvingAbortByUserError() })
    );
  };

  const optionalCircularProgress = solveWorkerRunning ? (
    <CircularProgress size={20} sx={{ mr: 1 }} />
  ) : null;

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSolveClick}
        disabled={solveWorkerRunning}
      >
        {t("actions_bar.actions_bar.btn_solve")}
      </Button>

      {/* Solver Select */}
      <Tooltip
        title={
          solveWorkerRunning ? (
            <Box sx={{ display: "flex", flexDirection: "column", p: 1 }}>
              <Typography sx={{ mb: 1 }} textAlign="center">
                {t("actions_bar.actions_bar.tooltip_solve")}
              </Typography>

              <Button
                variant="contained"
                color="error"
                onClick={handleAbortSolverClick}
              >
                {t("actions_bar.actions_bar.btn_solve_abort")}
              </Button>
            </Box>
          ) : (
            ""
          )
        }
      >
        <Select
          value={selectedSolver}
          onChange={(e) => setSelectedSolver(e.target.value)}
          sx={{ ml: 1 }}
          disabled={solveWorkerRunning}
        >
          <MenuItem color="primary" value="HIGHS">
            {optionalCircularProgress}
            {t("buttons.solver.highs")}
          </MenuItem>
          <MenuItem value="GLPK">
            {optionalCircularProgress}
            {t("buttons.solver.glpk")}
          </MenuItem>
        </Select>
      </Tooltip>
    </>
  );
}
