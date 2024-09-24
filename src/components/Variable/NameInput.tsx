import { TextField, Typography } from "@mui/material";
import { useMouseContext } from "../MouseProvider/MouseProvider";

export default function NameInput({
  name,
  setName,
  label = "Name",
}: {
  name: string;
  setName: (name: string) => void;
  label?: string;
}) {
  const { isInside } = useMouseContext();

  // Draw TextField when name is choosen and mouse is inside

  if (!isInside && name !== "") {
    return (
      <Typography variant="h6">
        {name}
      </Typography>
    );
  } else {
    return (
      <TextField
      sx={{mx : 1}}
        size="small"
        label={label}
        variant="outlined"
        value={name}
        onChange={(e: { target: { value: string } }) => setName(e.target.value)}
        fullWidth
      />
    );
  }
}
