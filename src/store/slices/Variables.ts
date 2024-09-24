import {
  GetDefaultVariable,
  Variable,
  VarDimensionType,
  VarPropertyType,
  VarValueType,
} from "@/lib/types/Variable";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: Variable[] = [GetDefaultVariable()];

export const variablesSlice = createSlice({
  name: "variables",
  initialState,
  reducers: {
    addVariable: (state) => {
      state.push(GetDefaultVariable());
    },
    removeVariable: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1);
    },
    setName: (
      state,
      action: PayloadAction<{ index: number; name: string }>
    ) => {
      state[action.payload.index].name = action.payload.name;
    },
    setLowerBound: (
      state,
      action: PayloadAction<{ index: number; lowerBound: string }>
    ) => {
      state[action.payload.index].lowerBound = action.payload.lowerBound;
    },
    setUpperBound: (
      state,
      action: PayloadAction<{ index: number; upperBound: string }>
    ) => {
      state[action.payload.index].upperBound = action.payload.upperBound;
    },
    setValueType: (
      state,
      action: PayloadAction<{ index: number; valueType: VarValueType }>
    ) => {
      state[action.payload.index].valueType = action.payload.valueType;
    },
    setPropertyType: (
      state,
      action: PayloadAction<{ index: number; propertyType: VarPropertyType }>
    ) => {
      state[action.payload.index].propertyType = action.payload.propertyType;
    },
    setDimensionType: (
      state,
      action: PayloadAction<{ index: number; dimensionType: VarDimensionType }>
    ) => {
      state[action.payload.index].dimensionType = action.payload.dimensionType;
    },
    setDimList: (
      state,
      action: PayloadAction<{ index: number; dimList: string[] }>
    ) => {
      state[action.payload.index].dimList = action.payload.dimList;
    },
    clearAllVariables: (state) => {
      state.splice(0, state.length);
    },
    validate: (state) => {
      // TODO: Implement validation
      console.log("Validating variables state", state);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addVariable,
  removeVariable,
  setName,
  setLowerBound,
  setUpperBound,
  setValueType,
  setPropertyType,
  setDimensionType,
  setDimList,
  clearAllVariables,
  validate,
} = variablesSlice.actions;

export default variablesSlice.reducer;
