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

import { TextField, Typography } from "@mui/material";
import { useMouseContext } from "../MouseProvider/MouseProvider";

export default function FormularTextField({
  text,
  setText,
  label = "",
  centered = true,
  error = false,
}: {
  text: string;
  setText: (text: string) => void;
  label?: string;
  centered?: boolean;
  error?: boolean;
}) {
  const { isInside } = useMouseContext();

  if (!isInside && text !== "") {
    return (
      <Typography
        variant="h5"
        textAlign="center"
        justifyContent="center"
        display="flex"
        alignItems="center"
        sx={{ flex: 1, minWidth: "150px", color: error ? "red" : "textPrimary" }}
      >
        {text.replace("<=", " ≤ ").replace(">=", " ≥ ")}
      </Typography>
    );
  }

  return (
    <TextField
      fullWidth
      label={label}
      variant="outlined"
      sx={{ flex: 1, minWidth: "150px" }}
      error={error}
      size="small"
      slotProps={{
        htmlInput: {
          style: centered ? { textAlign: "center" } : {},
        },
      }}
      value={text}
      onChange={(e: { target: { value: string } }) => setText(e.target.value)}
    />
  );
}
