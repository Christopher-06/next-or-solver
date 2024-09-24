"use client";
import { Button, Grid2, Stack } from "@mui/material";
import React from "react";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import { Solution } from "@/lib/types/Solution";
import { clearSolution, setSolution } from "@/store/slices/Solution";
import { useDispatch } from "react-redux";
import { clearAllVariables } from "@/store/slices/Variables";

const EXPECTED_SOLUTION: Solution = {
  Status: "Optimal",
  ObjectiveValue: 87.5,
  Columns: {
    x1: {
      Index: 0,
      Status: "BS",
      Lower: 0,
      Upper: 40,
      Type: "Continuous",
      Primal: 17.5,
      Dual: -0,
      Name: "x1",
    },
    x2: {
      Index: 1,
      Status: "BS",
      Lower: 0,
      Upper: Infinity,
      Type: "Continuous",
      Primal: 1,
      Dual: -0,
      Name: "x2",
    },
    x3: {
      Index: 2,
      Status: "BS",
      Lower: 0,
      Upper: Infinity,
      Type: "Continuous",
      Primal: 16.5,
      Dual: -0,
      Name: "x3",
    },
    x4: {
      Index: 3,
      Status: "LB",
      Lower: 2,
      Upper: 3,
      Type: "Continuous",
      Primal: 2,
      Dual: -8.75,
      Name: "x4",
    },
  },
  Rows: [
    {
      Index: 0,
      Name: "c1",
      Status: "UB",
      Lower: -Infinity,
      Upper: 20,
      Primal: 20,
      Dual: 1.5,
    },
    {
      Index: 1,
      Name: "c2",
      Status: "UB",
      Lower: -Infinity,
      Upper: 30,
      Primal: 30,
      Dual: 2.5,
    },
    {
      Index: 2,
      Name: "c3",
      Status: "UB",
      Lower: 0,
      Upper: 0,
      Primal: 0,
      Dual: 10.5,
    },
  ],
};

export default function ActionsBar() {
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
                dispatch(clearSolution());
                dispatch(clearAllVariables());
              }}
            >
              Alles Löschen
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                dispatch(setSolution(EXPECTED_SOLUTION));
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
