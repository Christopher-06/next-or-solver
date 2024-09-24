import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { InputType } from "./InputType";
import { HighsSolution } from "highs";

const initialState: {
  [key in InputType]: {
    solution: HighsSolution | undefined;
    startTime: EpochTimeStamp | undefined;
    endTime: EpochTimeStamp | undefined;
  };
} = {
  EASY_UI: {
    solution: undefined,
    startTime: undefined,
    endTime: undefined,
  },
  GMPL: {
    solution: undefined,
    startTime: undefined,
    endTime: undefined,
  },
  CPLEX_LP: {
    solution: undefined,
    startTime: undefined,
    endTime: undefined,
  },
  MPS: {
    solution: undefined,
    startTime: undefined,
    endTime: undefined,
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
      };
    },
    startSolving: (state, action: PayloadAction<InputType>) => {
      state[action.payload] = {
        solution: undefined,
        startTime: Date.now(),
        endTime: undefined,
      };
    },
    clearSolution: (state, action: PayloadAction<InputType>) => {
      state[action.payload] = {
        solution: undefined,
        startTime: undefined,
        endTime: undefined,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSolution, clearSolution, startSolving } =
  solveResultsSlice.actions;

export default solveResultsSlice.reducer;
