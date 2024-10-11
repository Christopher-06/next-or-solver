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
import { Chip, InputAdornment, MenuItem, Select } from "@mui/material";
import { useMouseContext } from "@/components/MouseProvider/MouseProvider";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { Sense } from "@/lib/types/Modell";

const ALL_SENSE_TYPES: Sense[] = ["MAX", "MIN"];

const SENSE_ICON: { [key in Sense]: JSX.Element } = {
  MAX: <KeyboardDoubleArrowUpIcon />,
  MIN: <KeyboardDoubleArrowDownIcon />,
};

export default function SenseSelector({
  sense,
  setSense,
}: {
  sense: Sense;
  setSense: (sense: Sense) => void;
}) {
  const { isInside, setIsInside } = useMouseContext();

  const onChange = (e: { target: { value: string } }) => {
    setSense(ALL_SENSE_TYPES[parseInt(e.target.value)]);
  };

  if (!isInside) {
    return (
      <Chip
        sx={{ mx: 1, w: 1 }}
        variant="filled"
        label={sense}
        color="secondary"
        icon={SENSE_ICON[sense]}
      />
    );
  }

  return (
    <>
      <Select
        value={ALL_SENSE_TYPES.indexOf(sense) + ""}
        onChange={onChange}
        MenuProps={{ disablePortal: true }}
        sx={{ flex: 1, mx: 1 }}
        size="small"
        startAdornment={
          <InputAdornment position="start">{SENSE_ICON[sense]}</InputAdornment>
        }
        fullWidth
        onClose={() => {
          setIsInside(false);
        }}
      >
        {ALL_SENSE_TYPES.map((sense, index) => (
          <MenuItem key={index} value={index}>
            {sense}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
