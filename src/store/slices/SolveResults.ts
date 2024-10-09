import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { InputType } from "./InputType";
import { HighsSolution } from "highs";

const initialState: {
  [key in InputType]: {
    solution: HighsSolution | undefined;
    startTime: EpochTimeStamp | undefined;
    endTime: EpochTimeStamp | undefined;
    error: Error | undefined;
    log: string[];
  };
} = {
  EASY_UI: {
    solution: undefined,
    startTime: undefined,
    endTime: undefined,
    error: undefined,
    log: [],
  },
  GMPL: {
    solution: undefined,
    startTime: undefined,
    endTime: undefined,
    error: undefined,
    log: [],
  },
  CPLEX_LP: {
    solution: undefined,
    startTime: undefined,
    endTime: undefined,
    error: undefined,
    log: [],
  },
  MPS: {
    solution: undefined,
    startTime: undefined,
    endTime: undefined,
    error: undefined,
    log: [],
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
        endTime: Date.now(),
        error: undefined,
        log: state[action.payload.key].log,
      };
    },
    startSolving: (state, action: PayloadAction<InputType>) => {
      state[action.payload] = {
        solution: undefined,
        startTime: Date.now(),
        endTime: undefined,
        error: undefined,
        log: [],
      };
    },
    clearSolution: (state, action: PayloadAction<InputType>) => {
      state[action.payload] = {
        solution: undefined,
        startTime: undefined,
        endTime: undefined,
        error: undefined,
        log: [],
      };
    },
    setSolutionError: (
      state,
      action: PayloadAction<{ key: InputType; error: Error }>
    ) => {
      state[action.payload.key] = {
        solution: undefined,
        startTime: state[action.payload.key].startTime,
        endTime: Date.now(),
        error: action.payload.error,
        log: state[action.payload.key].log,
      };
    },
    appendSolutionLog: (
      state,
      action: PayloadAction<{ key: InputType; log: string }>
    ) => {
      state[action.payload.key].log.push(action.payload.log);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSolution,
  clearSolution,
  startSolving,
  setSolutionError,
  appendSolutionLog,
} = solveResultsSlice.actions;

export default solveResultsSlice.reducer;
