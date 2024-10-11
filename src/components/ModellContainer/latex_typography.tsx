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

import { Box, Typography } from "@mui/material";
import MathJax from "react-mathjax2";

export default function LatexTypography({
  formular,
  error = false,
  variant = "h6",
  align = "center",
}: {
  variant?: "h6" | "h5" | "h4" | "h3" | "h2" | "h1";
  formular: string;
  align?: "center" | "left" | "right"
  error?: boolean;
}) {
  return (
    <Typography
      variant={variant}
      textAlign={align}
      sx={{
        flex: 1,
        minWidth: "150px",
        color: error ? "red" : "textPrimary",
        m: 0,
        p: 0,
      }}
    >
      <Box
        display="flex"
        justifyContent={align}
        alignItems={align}
        justifyItems={align}
        alignContent={align}
        flex={1}
        sx={{ m: 0, p: 0 }}
      >
        <MathJax.Node>{formular}</MathJax.Node>
      </Box>
    </Typography>
  );
}
