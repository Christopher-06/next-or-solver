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

"use client";
import { RootState } from "@/store/store";
import { Grid2, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVariableValue } from "@/store/slices/Variables";
import ItemsChipArray from "./ItemsChipArray";
import AddItemField from "./AddItemField";

export default function SetInput({ variable_id }: { variable_id: string }) {
  const variable = useSelector((state: RootState) =>
    state.variables.find((v) => v._id === variable_id)
  );
  const dispatch = useDispatch();

  // Enforce Set as data type
  useEffect(() => {
    if (variable) {
      if (Array.isArray(variable.dataValue)) {
        return;
      }

      if (variable) {
        dispatch(setVariableValue({ _id: variable_id, value: [] }));
      }
    }
  }, [variable, variable_id, dispatch]);

  // Render nothing when not a set variable
  if (!variable || variable.dimensionType !== "SET") {
    console.error(
      `Variable not found or not a set variable (idx: ${variable_id})`,
      variable
    );
    return <></>;
  }

  // Render nothing when not a good data type
  if (!Array.isArray(variable.dataValue)) {
    return <></>;
  }

  return (
    <Grid2 size={{ md: 12, lg: 12 }}>
      <Stack direction="row" alignContent="center" justifyContent="center">
        <Typography variant="h5" alignContent="center">
          {variable.name} =
        </Typography>

        <Typography
          variant="h5"
          alignContent="center"
          justifyContent="center"
          sx={{ px: 1 }}
        >
          {"{"}
        </Typography>

        <ItemsChipArray
          entries={variable.dataValue.map((k) => k as string)}
          variable={variable}
        />

        <Typography variant="h5" alignContent="center" sx={{ px: 1 }}>
          {"}"}
        </Typography>

        <AddItemField variable={variable} />
      </Stack>
    </Grid2>
  );
}
