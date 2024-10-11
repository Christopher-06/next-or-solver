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
    currentError: Error | null;
  };
};

const initialState: TextFieldInputState = {
  GMPL: {
    textFieldValue: "",
    currentError: null,
  },
  CPLEX_LP: {
    textFieldValue: DEFAULT_CPLEX_LP_PROBLEM,
    currentError: null,
  },
  MPS: {
    textFieldValue: "",
    currentError: null,
  },
  EASY_UI: {
    textFieldValue: "",
    currentError: null,
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
    setInputError: (
      state,
      action: PayloadAction<{ error: Error | null; key: InputType | null }>
    ) => {
      if (action.payload.key !== null) {
        state[action.payload.key].currentError = action.payload.error;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTextFieldValue, setInputError } = TextFieldInputSlice.actions;

export default TextFieldInputSlice.reducer;
