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
import BackupTableIcon from "@mui/icons-material/BackupTable";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import CategoryIcon from "@mui/icons-material/Category";
import { VarDimensionType } from "@/lib/types/Variable";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

const ALL_DIMENSION_TYPES: VarDimensionType[] = ["SKALAR", "ARRAY", "SET"];

const DIMENSION_ICON: { [key in VarDimensionType]: JSX.Element } = {
  SKALAR: <LooksOneIcon />,
  ARRAY: <BackupTableIcon />,
  SET: <CategoryIcon />,
};

const DIMENSION_TYPES_KEYS : { [key in VarDimensionType]: string} = {
  SKALAR: "dimension.type.skalar",
  ARRAY: "dimension.type.array",
  SET: "dimension.type.set"
};

export default function DataTypeSelector({
  dimensionType,
  setDimensionType,
  keepTextFields = false,
  allowSet = true
}: {
  dimensionType: VarDimensionType;
  setDimensionType: (dataType: VarDimensionType) => void;
  keepTextFields?: boolean;
  allowSet?: boolean;
}) {
  const { isInside, setIsInside } = useMouseContext();
  const t = useTranslations();

  const onChange = (e: { target: { value: string } }) => {
    setDimensionType(ALL_DIMENSION_TYPES[parseInt(e.target.value)]);
  };

  // Switch to SKALAR if SET is not allowed
  useEffect(() => {
    if (dimensionType === "SET" && !allowSet) {
      setDimensionType("SKALAR");
    }
  }, [dimensionType, allowSet, setDimensionType]);

  if (!isInside && !keepTextFields) {
    return (
      <Chip
        sx={{ flex: 1, mx: 1 }}
        variant="filled"
        label={dimensionType}
        color="info"
        icon={DIMENSION_ICON[dimensionType]}
      />
    );
  }

  return (
    <>
      <Select
        value={ALL_DIMENSION_TYPES.indexOf(dimensionType) + ""}
        onChange={onChange}
        MenuProps={{ disablePortal: true }}
        sx={{ mx: 1 }}
        size="small"
        startAdornment={
          <InputAdornment position="start">
            {DIMENSION_ICON[dimensionType]}
          </InputAdornment>
        }
        fullWidth
        onClose={() => {
          setIsInside(false);
        }}
      >
        {ALL_DIMENSION_TYPES
        .filter((type) => allowSet || type !== "SET")
        .map((dimensionType, index) => (
          <MenuItem key={index} value={index}>
            {t(DIMENSION_TYPES_KEYS[dimensionType])}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
