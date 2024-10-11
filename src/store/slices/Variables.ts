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
    _id: createUniqueID(),
    name: "x",
    lowerBound: 0,
    valueType: "INTEGER",
    propertyType: "DECISION",
    dimensionType: "ARRAY",
    dimList: ["I", "J"],
    dataValue: []
  },
  {
    _id: createUniqueID(),
    name: "I",
    valueType: "CONTINUOUS",
    propertyType: "PARAMETER",
    dimensionType: "SET",
    dimList: [],
    dataValue: [
      "Seattle",
      "San-Diego",
    ],
  },
  {
    _id: createUniqueID(),
    name: "J",
    valueType: "CONTINUOUS",
    propertyType: "PARAMETER",
    dimensionType: "SET",
    dimList: [],
    dataValue: 
      ["New-York", "Chicago", "Topeka"]
    ,
  },
  {
    _id: createUniqueID(),
    name: "a",
    valueType: "CONTINUOUS",
    propertyType: "PARAMETER",
    dimensionType: "ARRAY",
    dimList: ["I"],
    dataValue: [350, 600]
  },
  {
    _id: createUniqueID(),
    name: "b",
    valueType: "CONTINUOUS",
    propertyType: "PARAMETER",
    dimensionType: "ARRAY",
    dimList: ["J"],
    dataValue: [325, 300, 275]
  },
  {
    _id: createUniqueID(),
    name: "d",
    valueType: "CONTINUOUS",
    propertyType: "PARAMETER",
    dimensionType: "ARRAY",
    dimList: ["I", "J"],
    dataValue: [2.5, 1.8, 1.8, 2.5, 1.8, 1.4]
  },
  {
    _id: createUniqueID(),
    name: "f",
    valueType: "CONTINUOUS",
    propertyType: "PARAMETER",
    dimensionType: "SKALAR",
    dimList: [],
    dataValue: 90
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
    setWholeVariableList : (state, action: PayloadAction<Variable[]>) => {
      // delete all variables
      state.splice(0, state.length);

      // add new variables
      state.push(...action.payload);
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
  setWholeVariableList,
  validate,
} = variablesSlice.actions;

export default variablesSlice.reducer;
