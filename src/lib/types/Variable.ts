import { createUniqueID } from "../helper";

export type VarPropertyType = "DECISION" | "PARAMETER";

export type VarValueType = "CONTINUOUS" | "INTEGER";

export type VarDimensionType = "SKALAR" | "ARRAY" | "SET";

export type VarValueDataType = undefined | number | (number|undefined)[] | string[];
export function isNumber(val: VarValueDataType): val is number {
  return (val as number).valueOf !== undefined;
}

export interface Variable {
  _id: string;
  name: string;
  lowerBound?: number;
  upperBound?: number;
  valueType: VarValueType;
  propertyType: VarPropertyType;
  dimensionType: VarDimensionType;
  dimList: string[];
  dataValue: VarValueDataType;
}



export function GetDefaultVariable(): Variable {
  return {
    _id: createUniqueID(),
    name: "",
    lowerBound: undefined,
    upperBound: undefined,
    valueType: "CONTINUOUS",
    propertyType: "DECISION",
    dimensionType: "SKALAR",
    dimList: [],
    dataValue : undefined
  };
}
