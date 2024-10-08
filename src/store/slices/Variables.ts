import {
  GetDefaultVariable,
  Variable,
  VarDimensionType,
  VarPropertyType,
  VarValueType,
  VarValueDataType,
} from "@/lib/types/Variable";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: Variable[] = [
  {
    _id: "2345tgd",
    name: "x",
    lowerBound: 0,
    upperBound: 10,
    valueType: "CONTINUOUS",
    propertyType: "DECISION",
    dimensionType: "SKALAR",
    dimList: [],
    dataValue: undefined,
  },
  {
    _id: "tzwrhgbs",
    name: "z",
    lowerBound: 0,
    upperBound: 1,
    valueType: "INTEGER",
    propertyType: "PARAMETER",
    dimensionType: "SKALAR",
    dimList: [],
    dataValue: undefined,
  },
  {
    _id: "sfghfgh",
    name: "c",
    valueType: "CONTINUOUS",
    propertyType: "PARAMETER",
    dimensionType: "ARRAY",
    dimList: ["p", "p"],
    dataValue: undefined,
  },
  {
    _id: "hsfhsh",
    name: "p",
    valueType: "CONTINUOUS",
    propertyType: "PARAMETER",
    dimensionType: "SET",
    dimList: [],
    dataValue: new Set<string>(["Meppen", "Hamburg", "Lingen", "Groß Hesepe", "Apeldorn", "Twist"]),
  }
];

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
      action: PayloadAction<{ index: number; lowerBound: number | undefined }>
    ) => {
      state[action.payload.index].lowerBound = action.payload.lowerBound;
    },
    setUpperBound: (
      state,
      action: PayloadAction<{ index: number; upperBound: number | undefined }>
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
      // clear data when switching dimension type
      if (
        state[action.payload.index].dimensionType !==
        action.payload.dimensionType
      ) {
        state[action.payload.index].dimList = [];
        state[action.payload.index].dataValue = undefined;
      }

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
    setVariableValue: (
      state,
      action: PayloadAction<{ _id: string; value: VarValueDataType }>
    ) => {
      const variable = state.find((v) => v._id === action.payload._id);
      if (variable) {
        variable.dataValue = action.payload.value;
      }
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
  setVariableValue,
  validate,
} = variablesSlice.actions;

export default variablesSlice.reducer;
