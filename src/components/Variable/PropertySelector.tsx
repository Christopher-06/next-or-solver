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

import { Chip, InputAdornment, MenuItem, Select } from "@mui/material";
import { useMouseContext } from "../MouseProvider/MouseProvider";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import SurroundSoundIcon from "@mui/icons-material/SurroundSound";
import { VarPropertyType } from "@/lib/types/Variable";
import { useTranslations } from "next-intl";

const ALL_PROPERTY_TYPES: VarPropertyType[] = ["DECISION", "PARAMETER"];

const PROPERTY_ICON: { [key in VarPropertyType]: JSX.Element } = {
  DECISION: <CrisisAlertIcon />,
  PARAMETER: <SurroundSoundIcon />,
};

const PROPERTY_COLOR: { [key in VarPropertyType]: "success" | "secondary" } = {
  DECISION: "success",
  PARAMETER: "secondary",
};

const PROPERTY_LABEL_KEYS : { [key in VarPropertyType]: string} = {
  DECISION: "variable.type.decision",
  PARAMETER: "variable.type.system"
};

export default function PropertySelector({
  propertyType,
  setPropertyType,
  keepTextFields = false,
}: {
  propertyType: VarPropertyType;
  setPropertyType: (dataType: VarPropertyType) => void;
  keepTextFields?: boolean;
}) {
  const t = useTranslations();
  const { isInside, setIsInside } = useMouseContext();

  const onChange = (e: { target: { value: string } }) => {
    setPropertyType(ALL_PROPERTY_TYPES[parseInt(e.target.value)]);
  };

  if (!isInside && !keepTextFields) {
    return (
      <Chip
        sx={{ flex: 1, mx: 1 }}
        variant="filled"
        label={t(PROPERTY_LABEL_KEYS[propertyType])}
        color={PROPERTY_COLOR[propertyType]}
        icon={PROPERTY_ICON[propertyType]}
      />
    );
  }

  return (
    <>
      <Select
        value={ALL_PROPERTY_TYPES.indexOf(propertyType) + ""}
        onChange={onChange}
        MenuProps={{ disablePortal: true }}
        size="small"
        sx={{ mx: 1 }}
        startAdornment={
          <InputAdornment position="start">
            {PROPERTY_ICON[propertyType]}
          </InputAdornment>
        }
        fullWidth
        onClose={() => {
          setIsInside(false);
        }}
      >
        {ALL_PROPERTY_TYPES.map((propertyType, index) => (
          <MenuItem key={index} value={index}>
            {t(PROPERTY_LABEL_KEYS[propertyType])}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}

