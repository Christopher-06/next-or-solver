import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type InputType = "EASY_UI" | "GMPL" |"CPLEX_LP" | "MPS";

export const inputTypeSlice = createSlice({
  name: "inputType",
  initialState : "EASY_UI" as InputType,
  reducers: {
    changeInputType: (state, action: PayloadAction<InputType>) => {
        state = action.payload;
        return state;
    }
  },
});

// Action creators are generated for each case reducer function
export const { changeInputType } = inputTypeSlice.actions;

export default inputTypeSlice.reducer;
