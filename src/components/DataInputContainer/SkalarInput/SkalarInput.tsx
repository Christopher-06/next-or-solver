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

import { setVariableValue } from "@/store/slices/Variables";
import { RootState } from "@/store/store";
import { Grid2, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import NumericInput from "../NumericInput/NumericInput";

export default function SkalarInput({ variable_id }: { variable_id: string }) {
  const dispatch = useDispatch();
  const variable = useSelector((state: RootState) =>
    state.variables.find((v) => v._id === variable_id)
  );

  const setValueDispatched = (value: number) => {
    dispatch(setVariableValue({ _id: variable_id, value }));
  };

  if (!variable) {
    console.log("Variable not found", variable_id);
    return null;
  }

  return (
    <Grid2 size={{ sm : 12, md: 4, lg: 4,  }}>
      <Stack spacing={2} sx={{ mt: 2, w: 1 }} direction="row">
        <Typography variant="h5" justifyContent="center">
          {variable.name} =
        </Typography>

        <NumericInput
          value={variable.dataValue}
          setValue={setValueDispatched}
          valueType={variable.valueType}
        />
      </Stack>
    </Grid2>
  );
}
