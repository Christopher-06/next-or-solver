import { TextField, Typography } from "@mui/material";
import { useMouseContext } from "../MouseProvider/MouseProvider";

export default function FormularTextField({
  text,
  setText,
  label = "",
  centered = true,
}: {
  text: string;
  setText: (text: string) => void;
  label?: string;
  centered?: boolean;
}) {
  const { isInside } = useMouseContext();

  if (!isInside && text !== "") {
    return (
      <Typography
        variant="h5"
        textAlign="center"
        justifyContent="center"
        display="flex"
        alignItems="center"
        sx={{ flex: 1, minWidth: "150px" }}
      >
        {text.replace("<=", " ≤ ").replace(">=", " ≥ ")}
      </Typography>
    );
  }

  return (
    <TextField
      fullWidth
      label={label}
      variant="outlined"
      sx={{ flex: 1, minWidth: "150px" }}
      size="small"
      slotProps={{
        htmlInput: {
          style: centered ? { textAlign: "center" } : {},
        },
      }}
      value={text}
      onChange={(e: { target: { value: string } }) => setText(e.target.value)}
    />
  );
}
