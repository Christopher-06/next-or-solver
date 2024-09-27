import { Sense } from "@/components/ModellContainer/Objective/SenseSelector";
import {
    GetDefaultVariable,
    Variable,
    VarDimensionType,
    VarPropertyType,
    VarValueType,
  } from "@/lib/types/Variable";
  import { createSlice } from "@reduxjs/toolkit";
  import type { PayloadAction } from "@reduxjs/toolkit";
import { clear } from "console";
  
export interface Constraint {
    name: string;
    formular: string;
}

export type Modell = {
    objective_formular: string;
    sense: Sense;
    constraints: Constraint[];
}

  const initialState: Modell = {
    objective_formular: "",
    sense: "MAX",
    constraints: [],
  }
  
  export const modellSlice = createSlice({
    name: "modell",
    initialState,
    reducers: {
      addConstraint: (state) => {
        state.constraints.push({ name: `c${state.constraints.length + 1}`, formular: "" });
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
        state.constraints[action.payload.index].formular = action.payload.formular;
      },
      setObjectiveFormular: (
        state,
        action: PayloadAction<string>
      ) => {
        state.objective_formular = action.payload;
      },
      setObjectiveSense: (
        state,
        action: PayloadAction<Sense>
      ) => {
        state.sense = action.payload;
      },
      clearAllModell : (state) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        state = initialState;
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
    validate,
  } = modellSlice.actions;
  
  export default modellSlice.reducer;
  