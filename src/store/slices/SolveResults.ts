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

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { InputType } from "./InputType";
import { HighsSolution } from "highs";
import { Pair } from "@/lib/helper";

export class SolvingAbortByUserError extends Error {
  constructor() {
    super("Solving aborted by User");
    this.name = "SolvingAbortError";
  }
}

const initialState: {
  [key in InputType]: {
    solution: HighsSolution | undefined;
    startTime: EpochTimeStamp | undefined;
    endTime: EpochTimeStamp | undefined;
    error: Error | undefined;
    solverLog: Pair<string, number>[];
    solverOutput: Pair<string, number>[];
  };
} = {
  EASY_UI: {
    solution: undefined,
    startTime: undefined,
    endTime: undefined,
    error: undefined,
    solverLog: [],
    solverOutput: [],
  },
  GMPL: {
    solution: undefined,
    startTime: undefined,
    endTime: undefined,
    error: undefined,
    solverLog: [],
    solverOutput: [],
  },
  CPLEX_LP: {
    solution: undefined,
    startTime: undefined,
    endTime: undefined,
    error: undefined,
    solverLog: [],
    solverOutput: [],
  },
  MPS: {
    solution: undefined,
    startTime: undefined,
    endTime: undefined,
    error: undefined,
    solverLog: [],
    solverOutput: [],
  },
};

export const solveResultsSlice = createSlice({
  name: "solveResults",
  initialState,
  reducers: {
    setSolution: (
      state,
      action: PayloadAction<{
        key: InputType;
        solution: HighsSolution;
      }>
    ) => {
      state[action.payload.key] = {
        solution: action.payload.solution,
        startTime: state[action.payload.key].startTime,
        endTime: performance.now(),
        error: undefined,
        solverLog: state[action.payload.key].solverLog,
        solverOutput: state[action.payload.key].solverOutput,
      };
    },
    startSolving: (state, action: PayloadAction<InputType>) => {
      state[action.payload] = {
        solution: undefined,
        startTime: performance.now(),
        endTime: undefined,
        error: undefined,
        solverLog: [],
        solverOutput: [],
      };
    },
    clearSolution: (state, action: PayloadAction<InputType>) => {
      state[action.payload] = {
        solution: undefined,
        startTime: undefined,
        endTime: undefined,
        error: undefined,
        solverLog: [],
        solverOutput: [],
      };
    },
    setSolutionError: (
      state,
      action: PayloadAction<{ key: InputType; error: Error }>
    ) => {
      state[action.payload.key] = {
        solution: undefined,
        startTime: state[action.payload.key].startTime,
        endTime: performance.now(),
        error: action.payload.error,
        solverLog: state[action.payload.key].solverLog,
        solverOutput: state[action.payload.key].solverOutput,
      };
    },
    appendSolutionSolverLog: (
      state,
      action: PayloadAction<{ key: InputType; log: string }>
    ) => {
      state[action.payload.key].solverLog.push([
        action.payload.log,
        Date.now(),
      ]);
    },
    appendSolutionSolverOutput: (
      state,
      action: PayloadAction<{ key: InputType; out: string }>
    ) => {
      state[action.payload.key].solverOutput.push([
        action.payload.out,
        Date.now(),
      ]);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSolution,
  clearSolution,
  startSolving,
  setSolutionError,
  appendSolutionSolverOutput,
  appendSolutionSolverLog,
} = solveResultsSlice.actions;

export default solveResultsSlice.reducer;
