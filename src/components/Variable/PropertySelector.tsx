import { Chip, InputAdornment, MenuItem, Select } from "@mui/material";
import { useMouseContext } from "../MouseProvider/MouseProvider";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import SurroundSoundIcon from "@mui/icons-material/SurroundSound";

export type VarPropertyType = "DECISION" | "PARAMETER";
const ALL_PROPERTY_TYPES: VarPropertyType[] = ["DECISION", "PARAMETER"];

const PROPERTY_ICON: { [key in VarPropertyType]: JSX.Element } = {
  DECISION: <CrisisAlertIcon />,
  PARAMETER: <SurroundSoundIcon />,
};

const PROPERTY_COLOR: { [key in VarPropertyType]: "success" | "secondary" } = {
  DECISION: "success",
  PARAMETER: "secondary",
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
  const { isInside } = useMouseContext();

  const onChange = (e: { target: { value: string } }) => {
    setPropertyType(ALL_PROPERTY_TYPES[parseInt(e.target.value)]);
  };

  if (!isInside && !keepTextFields) {
    return (
      <Chip
        sx={{ flex: 1, mx: 1 }}
        variant="filled"
        label={propertyType}
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
      >
        {ALL_PROPERTY_TYPES.map((propertyType, index) => (
          <MenuItem key={index} value={index}>
            {propertyType}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
