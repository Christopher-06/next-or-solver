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

import { Variable } from "../types/Variable";
import { ConvertError } from "./converter";

export function decisionSkalarVariableDefinitions(variables: Variable[]) {
  return variables
    .filter(
      (variable) =>
        variable.propertyType === "DECISION" &&
        variable.dimensionType === "SKALAR" &&
        variable.name !== ""
    )
    .map((variable) => {
      let gmpl = `var\t${variable.name}`;
      if (variable.valueType === "INTEGER") {
        gmpl += ", integer";
      }
      if (variable.lowerBound !== undefined) {
        gmpl += `, >= ${variable.lowerBound}`;
      }
      if (variable.upperBound !== undefined) {
        gmpl += `, <= ${variable.upperBound}`;
      }

      return [gmpl]; // with no data value
    });
}

export function decisionArrayVariableDefinitions(variables: Variable[]) {
  return variables
    .filter(
      (variable) =>
        variable.propertyType === "DECISION" &&
        variable.dimensionType === "ARRAY" &&
        variable.name !== ""
    )
    .map((variable) => {
      const dimList = variable.dimList
        .map((dim) => dim.toLocaleLowerCase() + " in " + dim)
        .join(", ");

      let gmpl = `var\t${variable.name}{${dimList}}`;
      if (variable.valueType === "INTEGER") {
        gmpl += ", integer";
      }
      if (variable.lowerBound !== undefined) {
        gmpl += `, >= ${variable.lowerBound}`;
      }
      if (variable.upperBound !== undefined) {
        gmpl += `, <= ${variable.upperBound}`;
      }

      return [gmpl]; // with no data value
    });
}

export function parameterSkalarVariableDefinitions(variables: Variable[]) {
  return variables
    .filter(
      (variable) =>
        variable.propertyType === "PARAMETER" &&
        variable.dimensionType === "SKALAR" &&
        variable.name !== ""
    )
    .map((variable) => {
      const prefix = `param\t${variable.name}`;
      return [prefix, prefix + " :=\t" + variable.dataValue];
    });
}

export function parameterSetVariableDefinitions(variables: Variable[]) {
  return variables
    .filter(
      (variable) =>
        variable.propertyType === "PARAMETER" &&
        variable.dimensionType === "SET" &&
        variable.name !== ""
    )
    .map((variable) => {
      const prefix = `set\t${variable.name}`;

      const setValues = variable.dataValue as string[];

      return [prefix, prefix + " :=\t" + setValues.join("\t")];
    });
}

export function parameterArrayVariableDefinitions(variables: Variable[]) {
  return variables
    .filter(
      (variable) =>
        variable.propertyType === "PARAMETER" &&
        variable.dimensionType === "ARRAY" &&
        variable.name !== ""
    )
    .map((variable) => {
      const prefix = `param\t${variable.name}`;
      const dimList = variable.dimList
        .map((dim) => {
          let s = dim.toLocaleLowerCase();
          s += " in " + dim;
          return s;
        })
        .join(", ");

      // Add Data Values
      if (
        !(variable.dataValue instanceof Array) ||
        variable.dimList.length === 0
      ) {
        throw new ConvertError("NO_DIMENSION", variable);
      }
      const dataValues = variable.dataValue as (number | undefined)[];

      let gmplDataValues = prefix + " :";
      if (variable.dimList.length === 1) {
        // 1D Array
        const indexValues = variables.find(
          (v) => v.name === variable.dimList[0]
        )?.dataValue as string[];
        if (
          indexValues === undefined ||
          indexValues.length > dataValues.length
        ) {
          throw new ConvertError("NO_DIMENSION", variable);
        }

        const IndexWithData = Array.from(indexValues).map(
          (index_name, index) => index_name + "\t" + dataValues[index]
        );
        gmplDataValues += "=\t" + IndexWithData.join("\n\t\t");
      }
      if (variable.dimList.length === 2) {
        // 2D Array
        const indexValuesASet = variables.find(
          (v) => v.name === variable.dimList[1]
        )?.dataValue as string[];
        const indexValuesBSet = variables.find(
          (v) => v.name === variable.dimList[0]
        )?.dataValue as string[];
        if (
          indexValuesASet === undefined ||
          indexValuesBSet === undefined ||
          indexValuesASet.length * indexValuesBSet.length > dataValues.length
        ) {
          throw new ConvertError("NO_DIMENSION", variable);
        }

        const indexValuesA = indexValuesASet;
        const indexValuesB = indexValuesBSet;

        // First row is index A
        gmplDataValues += "\t\t\t\t" + indexValuesA.join("\t") + "\t:=\n";

        // Next rows are index B and data
        indexValuesB.forEach((indexB, indexBIndex) => {
          const indexBData = indexValuesA.map(
            (indexA, indexAIndex) =>
              dataValues[indexBIndex * indexValuesA.length + indexAIndex]
          );
          gmplDataValues += "\t\t\t" + indexB + "\t" + indexBData.join("\t\t");

          if (indexBIndex !== indexValuesB.length - 1) {
            gmplDataValues += "\n";
          }
        });
      }
      if (variable.dimList.length > 2) {
        throw new ConvertError("TOO_MANY_DIMENSIONS", variable);
      }

      return [prefix + "{" + dimList + "}", gmplDataValues];
    });
}
