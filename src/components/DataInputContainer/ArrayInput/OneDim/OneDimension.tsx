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

import { Variable } from "@/lib/types/Variable";
import { Stack, Typography } from "@mui/material";
import RowArray from "./RowArray";

export default function OneDimension({ variable }: { variable: Variable }) {
  return (
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
        {"["}
      </Typography>

      <RowArray variable={variable} />

      <Typography variant="h5" alignContent="center" sx={{ px: 1 }}>
        {"]"}
      </Typography>
    </Stack>
  );
}
