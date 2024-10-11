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
import PatternIcon from "@mui/icons-material/Pattern";
import PinIcon from "@mui/icons-material/Pin";
import { VarValueType } from "@/lib/types/Variable";

const ALL_VALUE_TYPES: VarValueType[] = ["CONTINUOUS", "INTEGER"];

const TYPE_ICON: { [key in VarValueType]: JSX.Element } = {
  CONTINUOUS: <PatternIcon />,
  INTEGER: <PinIcon />,
};

export default function DataTypeSelector({
  valueType,
  setValueType,
  keepTextFields = false,
}: {
  valueType: VarValueType;
  setValueType: (dataType: VarValueType) => void;
  keepTextFields?: boolean;
}) {
  const { isInside, setIsInside } = useMouseContext();

  const onChange = (e: { target: { value: string } }) => {
    setValueType(ALL_VALUE_TYPES[parseInt(e.target.value)]);
  };

  if (!isInside && !keepTextFields) {
    return (
      <Chip
        sx={{ flex: 1 }}
        variant="filled"
        label={valueType}
        color="info"
        icon={TYPE_ICON[valueType]}
      />
    );
  }

  return (
    <>
      <Select
        value={ALL_VALUE_TYPES.indexOf(valueType) + ""}
        onChange={onChange}
        MenuProps={{ disablePortal: true }}
        startAdornment={
          <InputAdornment position="start">
            {TYPE_ICON[valueType]}
          </InputAdornment>
        }
        size="small"
        fullWidth
        onClose={() => {
          setIsInside(false);
        }}
      >
        {ALL_VALUE_TYPES.map((valueType, index) => (
          <MenuItem key={index} value={index}>
            {valueType}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
