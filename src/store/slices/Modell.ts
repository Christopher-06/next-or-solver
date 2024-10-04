import { createUniqueID } from "@/lib/helper";
import { Modell, Sense } from "@/lib/types/Modell";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: Modell = {
  objective_formular: "",
  sense: "MAX",
  constraints: [],
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
