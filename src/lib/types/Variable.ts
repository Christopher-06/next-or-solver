export type VarPropertyType = "DECISION" | "PARAMETER";

export type VarValueType = "CONTINUOUS" | "INTEGER";

export type VarDimensionType = "SKALAR" | "ARRAY";

export interface Variable {
  name: string;
  lowerBound: string;
  upperBound: string;
  valueType: VarValueType;
  propertyType: VarPropertyType;
  dimensionType: VarDimensionType;
  dimList: string[];
}

export function GetDefaultVariable(): Variable {
  return {
    name: "",
    lowerBound: "",
    upperBound: "",
    valueType: "CONTINUOUS",
    propertyType: "DECISION",
    dimensionType: "SKALAR",
    dimList: []
  };
}
