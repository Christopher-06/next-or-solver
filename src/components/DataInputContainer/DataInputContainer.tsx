import { RootState } from "@/store/store";
import { Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import SkalarInput from "./SkalarInput/SkalarInput";
import SetInput from "./SetInput/SetInput";
import MouseProvider from "../MouseProvider/MouseProvider";
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

  return (
    <Stack spacing={2} sx={{ m: 2 }}>
      {variables.map((variable) => (
        <MouseProvider key={variable._id}>
          {renderInput(variable)}
        </MouseProvider>
      ))}
    </Stack>
  );
}
