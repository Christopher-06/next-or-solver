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

import { createUniqueID } from "@/lib/helper";
import { ForAllType, Modell, Sense } from "@/lib/types/Modell";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: Modell = {
  objective_formular: "",
  sense: "MIN",
  constraints: []
};

export const modellSlice = createSlice({
  name: "modell",
  initialState,
  reducers: {
    addConstraint: (state) => {

      // generate unique constraint name
      let constraintName = `c${state.constraints.length + 1}`;
      while(state.constraints.find((c) => c.name === constraintName)) {
        constraintName += "'";
      }

      state.constraints.push({
        _id : createUniqueID(),
        name: constraintName,
        formular: "",
        for_all: []
      });
    },
    removeConstraint: (state, action: PayloadAction<number>) => {
      state.constraints.splice(action.payload, 1);
    },
    setConstraintName: (
      state,
      action: PayloadAction<{ index: number; name: string }>
    ) => {
      state.constraints[action.payload.index].name = action.payload.name;
    },
    setConstraintFormular: (
      state,
      action: PayloadAction<{ index: number; formular: string }>
    ) => {
      state.constraints[action.payload.index].formular =
        action.payload.formular;
    },
    setObjectiveFormular: (state, action: PayloadAction<string>) => {
      state.objective_formular = action.payload;
    },
    setObjectiveSense: (state, action: PayloadAction<Sense>) => {
      state.sense = action.payload;
    },
    clearAllModell: (state) => {
      state.objective_formular = "";
      state.constraints.splice(0, state.constraints.length);
    },
    setConstraintForAll : (state, action : PayloadAction<{index : number, value: ForAllType[]}>) => {
      state.constraints[action.payload.index].for_all = [...action.payload.value];
    },
    setWholeModellState: (state, action: PayloadAction<Modell>) => {
      state.objective_formular = action.payload.objective_formular;
      state.sense = action.payload.sense;
      state.constraints = [...action.payload.constraints];
    },
    validate: (state) => {
      // TODO: Implement validation
      console.log("Validating variables state", state);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addConstraint,
  removeConstraint,
  setConstraintName,
  setConstraintFormular,
  setObjectiveFormular,
  setObjectiveSense,
  clearAllModell,
  setConstraintForAll,
  validate,
  setWholeModellState
} = modellSlice.actions;

export default modellSlice.reducer;
