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
