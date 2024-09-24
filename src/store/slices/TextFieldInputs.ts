import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { InputType } from "./InputType";

const DEFAULT_CPLEX_LP_PROBLEM = `Maximize
 obj:
    x1 + 2 x2 + 4 x3 + x4
Subject To
 c1: - x1 + x2 + x3 + 10 x4 <= 20
 c2: x1 - 4 x2 + x3 <= 30
 c3: x2 - 0.5 x4 = 0
Bounds
 0 <= x1 <= 40
 2 <= x4 <= 3
End`;

type TextFieldInputState = {
  [key in InputType]: {
    textFieldValue: string;
  };
};

const initialState: TextFieldInputState = {
  GMPL: {
    textFieldValue: "",
  },
  CPLEX_LP: {
    textFieldValue: DEFAULT_CPLEX_LP_PROBLEM,
  },
  MPS: {
    textFieldValue: "",
  },
  EASY_UI: {
    textFieldValue: "",
  },
};

export const TextFieldInputSlice = createSlice({
  name: "textFieldInputs",
  initialState,
  reducers: {
    setTextFieldValue: (
      state,
      action: PayloadAction<{ value: string; key: InputType }>
    ) => {
      state[action.payload.key].textFieldValue = action.payload.value;

      if (action.payload.key === "EASY_UI") {
        console.error("EASY UI is not supported for Text Field Input Slice");
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTextFieldValue } = TextFieldInputSlice.actions;

export default TextFieldInputSlice.reducer;
