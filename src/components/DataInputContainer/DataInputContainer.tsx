import { RootState } from "@/store/store";
import { Grid2, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import SkalarInput from "./SkalarInput/SkalarInput";
import SetInput from "./SetInput/SetInput";
import { Variable } from "@/lib/types/Variable";
import React from "react";
import ArrayInput from "./ArrayInput/ArrayInput";

export default function DataInputContainer() {
  const variables = useSelector((state: RootState) =>
    state.variables.filter(
      (variable) =>
        variable.propertyType === "PARAMETER" && variable.name !== ""
    )
  );

  // No Variables
  if (variables.length === 0) {
    return (
      <Typography
        variant="h6"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        Keine Parameter vorhanden
      </Typography>
    );
  }

  const renderInput = (variable: Variable) => {
    switch (variable.dimensionType) {
      case "SKALAR":
        return <SkalarInput variable_id={variable._id} />;
      case "SET":
        return <SetInput variable_id={variable._id} />;
      case "ARRAY":
        return <ArrayInput variable_id={variable._id} />;
      default:
        console.error(`DimensionType ${variable.dimensionType} not supported`);
        return <></>;
    }
  };

  // get skalar input in row (3 in a row)
  const SkalarTriplets = variables
    .filter((v) => v.dimensionType === "SKALAR")
    .reduce((acc, variable, idx) => {
      if (idx % 3 === 0) {
        acc.push([variable]);
      } else {
        acc[acc.length - 1].push(variable);
      }
      return acc;
    }, [] as Variable[][]);

  const ArraySingles = variables.filter((v) => v.dimensionType === "ARRAY");
  const SetSingles = variables.filter((v) => v.dimensionType === "SET");

  // pack 3 skalar variables in a row and then one array / set and repeat
  const orderedVariables: Variable[] = [];
  while (
    SkalarTriplets.length > 0 ||
    ArraySingles.length > 0 ||
    SetSingles.length > 0
  ) {
    if (SkalarTriplets.length > 0) {
      orderedVariables.push(...SkalarTriplets.shift()!);
    }
    if (ArraySingles.length > 0) {
      orderedVariables.push(ArraySingles.shift()!);
    }
    if (SetSingles.length > 0) {
      orderedVariables.push(SetSingles.shift()!);
    }
  }

  return (
    <Grid2 container spacing={3} sx={{ m: 2 }}>
      {orderedVariables.map((variable) => renderInput(variable))}
    </Grid2>
  );
}
