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

import { useTranslations } from "next-intl";
import { TextField, Typography } from "@mui/material";
import { useMouseContext } from "../MouseProvider/MouseProvider";

export default function NameInput({
  name,
  setName,
  label = undefined,
  viewingSuffix = "",
  onBlur = () => {},
  errorText = undefined,
}: {
  name: string;
  setName: (name: string) => void;
  label?: string;
  viewingSuffix?: string;
  onBlur?: () => void;
  errorText?: string;
}) {
  const { isInside } = useMouseContext();
  const t = useTranslations();
  const tlabel = label || t("variable.name.label");

  // Draw TextField when name is choosen and mouse is inside

  if (!isInside && name !== "") {
    return (
      <Typography
        variant="h6"
        noWrap
        sx={{ mx: 3, w: 1 }}
        color={
          errorText !== undefined && errorText !== "" ? "error" : "textPrimary"
        }
      >
        {name}
        {viewingSuffix}
      </Typography>
    );
  } else {
    return (
      <TextField
        sx={{ mx: 1 }}
        size="small"
        label={tlabel}
        variant="outlined"
        helperText={errorText}
        error={errorText !== undefined && errorText !== ""}
        value={name}
        slotProps={{
          htmlInput: {
            style: { textAlign: "center" },
          },
        }}
        onChange={(e: { target: { value: string } }) => setName(e.target.value)}
        fullWidth
        onBlur={onBlur}
      />
    );
  }
}
