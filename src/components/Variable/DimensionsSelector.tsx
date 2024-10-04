import { Chip, InputAdornment, MenuItem, Select } from "@mui/material";
import { useMouseContext } from "../MouseProvider/MouseProvider";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import CategoryIcon from "@mui/icons-material/Category";
import { VarDimensionType } from "@/lib/types/Variable";
import { useEffect } from "react";

const ALL_DIMENSION_TYPES: VarDimensionType[] = ["SKALAR", "ARRAY", "SET"];

const DIMENSION_ICON: { [key in VarDimensionType]: JSX.Element } = {
  SKALAR: <LooksOneIcon />,
  ARRAY: <BackupTableIcon />,
  SET: <CategoryIcon />,
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
            {dimensionType}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
