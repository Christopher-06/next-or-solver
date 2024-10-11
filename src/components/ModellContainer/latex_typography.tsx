import { Box, Typography } from "@mui/material";
import MathJax from "react-mathjax2";

export default function LatexTypography({
  formular,
  error = false,
}: {
  formular: string;
  error?: boolean;
}) {
  return (
    <Typography
      variant="h6"
      textAlign="center"
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
        justifyContent="center"
        alignItems="center"
        justifyItems="center"
        alignContent="center"
        flex={1}
        sx={{ m: 0, p: 0 }}
      >
        <MathJax.Node>{formular}</MathJax.Node>
      </Box>
    </Typography>
  );
}
