"use client";
import { Chip, InputAdornment, MenuItem, Select } from "@mui/material";
import { useMouseContext } from "@/components/MouseProvider/MouseProvider";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

export type Sense = "MAX" | "MIN";

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
