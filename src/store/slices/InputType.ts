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
