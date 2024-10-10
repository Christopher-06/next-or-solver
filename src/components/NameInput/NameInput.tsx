import { TextField, Typography } from "@mui/material";
import { useMouseContext } from "../MouseProvider/MouseProvider";

export default function NameInput({
  name,
  setName,
  label = "Name",
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

  // Draw TextField when name is choosen and mouse is inside

  if (!isInside && name !== "") {
    return (
      <Typography
        variant="h6"
        noWrap
        sx={{ mx: 3, w : 1 }}
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
        label={label}
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
