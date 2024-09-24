"use client";
import { Button, Grid2, Stack } from "@mui/material";
import React from "react";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import {
  clearSolution,
  setSolution,
  startSolving,
} from "@/store/slices/SolveResults";
import { useDispatch, useSelector } from "react-redux";
import { clearAllVariables } from "@/store/slices/Variables";
import { RootState } from "@/store/store";
import solve from "@/lib/highs";

export default function ActionsBar() {
  const inputType = useSelector((state: RootState) => state.inputType);
  const textFieldInputs = useSelector((state: RootState) => state.textFieldInputs);
  const textFieldValue = textFieldInputs[inputType].textFieldValue;
  const dispatch = useDispatch();

  return (
    <>
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
            <Button
              variant="contained"
              color="warning"
              onClick={() => {
                dispatch(clearSolution(inputType));
                if (inputType == "EASY_UI") {
                  dispatch(clearAllVariables());
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
