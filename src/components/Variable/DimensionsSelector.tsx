import { Chip, InputAdornment, MenuItem, Select } from "@mui/material";
import { useMouseContext } from "../MouseProvider/MouseProvider";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import { VarDimensionType } from "@/lib/Variable";

const ALL_DIMENSION_TYPES: VarDimensionType[] = ["SKALAR", "ARRAY"];

const DIMENSION_ICON: { [key in VarDimensionType]: JSX.Element } = {
  SKALAR: <LooksOneIcon />,
  ARRAY: <BackupTableIcon />,
};

export default function DataTypeSelector({
  dimensionType,
  setDimensionType,
  keepTextFields = false,
}: {
  dimensionType: VarDimensionType;
  setDimensionType: (dataType: VarDimensionType) => void;
  keepTextFields?: boolean;
}) {
  const { isInside } = useMouseContext();

  const onChange = (e: { target: { value: string } }) => {
    setDimensionType(ALL_DIMENSION_TYPES[parseInt(e.target.value)]);
  };

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
      >
        {ALL_DIMENSION_TYPES.map((dimensionType, index) => (
          <MenuItem key={index} value={index}>
            {dimensionType}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
