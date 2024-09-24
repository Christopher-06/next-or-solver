import { Solution } from "@/lib/types/Solution";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: Solution[] = [];

export const solutionSlice = createSlice({
  name: "solution",
  initialState,
  reducers: {
    setSolution: (state, action: PayloadAction<Solution>) => {
      state.splice(0, state.length);
      state.push(action.payload);
    },
    clearSolution: (state) => {
      // clear the solution array
      state.splice(0, state.length);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSolution, clearSolution } = solutionSlice.actions;

export default solutionSlice.reducer;
