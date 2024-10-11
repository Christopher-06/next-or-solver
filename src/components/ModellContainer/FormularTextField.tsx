import { TextField } from "@mui/material";
import { useMouseContext } from "../MouseProvider/MouseProvider";
import LatexTypography from "./latex_typography";

const textToLatex = (text: string) => {
  text = "\\\\" + text;

  text = text.replace("(", " ( ").replace(")", " ) ");

  text = text.replace("sum", `\\sum\\limits_`);

  while (text.includes(" in ")) {
    text = text.replace(" in ", " \\in ");
  }

  text = text.replace("<=", " \\leq ").replace(">=", " \\geq ");
  text = text.replace("*", " \\cdot ").replace("/", " \\div ");

  while (text.includes("  ")) {
    text = text.replace("  ", " ");
  }

  return text;
};

export default function FormularTextField({
  text,
  setText,
  label = "",
  centered = true,
  error = false,
}: {
  text: string;
  setText: (text: string) => void;
  label?: string;
  centered?: boolean;
  error?: boolean;
}) {
  const { isInside } = useMouseContext();

  if (!isInside && text !== "") {
    return (
      <LatexTypography formular={textToLatex(text)} error={error} />
    );
  }

  return (
    <TextField
      fullWidth
      label={label}
      variant="outlined"
      sx={{ flex: 1, minWidth: "150px" }}
      error={error}
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
