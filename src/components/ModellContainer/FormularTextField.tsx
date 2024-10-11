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

import { TextField } from "@mui/material";
import { useMouseContext } from "../MouseProvider/MouseProvider";
import LatexTypography from "./latex_typography";

const textToLatex = (text: string) => {
  text = "\\\\" + text;

  text = text.replaceAll("(", " ( \\    \\ ").replaceAll(")", " \\    \\ ) ");
  text = text.replaceAll("}", " } \\ \\ ").replaceAll("{", " { ");

  text = text.replaceAll("sum", `\\sum\\limits_`);
  text = text.replaceAll(" in ", " \\  \\ \\in \\  \\ ");
  text = text.replaceAll(",", " ,\\  \\ ");

  text = text
    .replaceAll("<=", " \\  \\ \\leq \\  \\ ")
    .replace(">=", " \\  \\ \\geq \\  \\ ");
  text = text.replaceAll("*", " \\cdot ").replaceAll("/", " \\div ");

  while (text.includes("  ")) {
    text = text.replaceAll("  ", " ");
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
    return <LatexTypography formular={textToLatex(text)} error={error} />;
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
