"use client";
import { Button, Grid2, Stack } from "@mui/material";
import React from "react";
import {
  clearSolution,
  setSolution,
  startSolving,
} from "@/store/slices/SolveResults";
import { useDispatch, useSelector } from "react-redux";
import { clearAllVariables } from "@/store/slices/Variables";
import { RootState } from "@/store/store";
import solve from "@/lib/highs";
import ExportButton from "../File/ExportButton";
import { FileFormat } from "../File/FileFormat";
import { InputType } from "@/store/slices/InputType";
import { setTextFieldValue } from "@/store/slices/TextFieldInputs";
import { clearAllModell } from "@/store/slices/Modell";

const FILEFORMAT_MAP: { [key in InputType]: FileFormat } = {
  GMPL: FileFormat.GMPL,
  CPLEX_LP: FileFormat.CPLEX_LP,
  MPS: FileFormat.MPS,
  EASY_UI: FileFormat.EASY_UI,
};

export default function ActionsBar() {
  const inputType = useSelector((state: RootState) => state.inputType);
  const textFieldInputs = useSelector(
    (state: RootState) => state.textFieldInputs
  );
  const textFieldValue = textFieldInputs[inputType].textFieldValue;
  const dispatch = useDispatch();

  const currentFormat = FILEFORMAT_MAP[inputType];

  return (
    <>
      <Grid2 container sx={{ px: 3 }} spacing={2}>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Stack direction="row" spacing={2} justifyContent="start">
            <ExportButton
              content={textFieldValue}
              currentFormat={currentFormat}
              targetFormat={FileFormat.GMPL}
            />
            <ExportButton
              content={textFieldValue}
              currentFormat={currentFormat}
              targetFormat={FileFormat.CPLEX_LP}
            />
            <ExportButton
              content={textFieldValue}
              currentFormat={currentFormat}
              targetFormat={FileFormat.MPS}
            />
          </Stack>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Stack direction="row" spacing={2} justifyContent="end">
            <Button
              variant="contained"
              color="warning"
              onClick={() => {
                dispatch(clearSolution(inputType));
                if (inputType == "EASY_UI") {
                  dispatch(clearAllVariables());
                  dispatch(clearAllModell())
                } else {
                  dispatch(
                    setTextFieldValue({
                      key: inputType,
                      value: "",
                    })
                  );
                }
              }}
            >
              Alles Löschen
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={async () => {
                dispatch(startSolving(inputType));
                solve(textFieldValue).then((solution) => {
                  dispatch(setSolution({ key: inputType, solution }));
                });
              }}
            >
              Lösen
            </Button>
          </Stack>
        </Grid2>
      </Grid2>
    </>
  );
}
