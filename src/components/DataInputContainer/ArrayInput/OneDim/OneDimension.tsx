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
