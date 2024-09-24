import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { useMouseContext } from "../MouseProvider/MouseProvider";

function getBoxed(type: "UB" | "LB", children: JSX.Element) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: type === "UB" ? "start" : "end", // left right alined based on UB/LB
      }}
    >
      {children}
    </Box>
  );
}

export default function UpperBound({
  bound,
  setBound,
  type,
  keepTextFields = false,
}: {
  bound: string;
  setBound: (bound: string) => void;
  type: "UB" | "LB";
  keepTextFields?: boolean;
}) {
  const { isInside } = useMouseContext();

  // Draw nothing when not inside and no upperBound is choosen
  if (!isInside && bound === "" && !keepTextFields) {
    return <></>;
  }

  // Draw Value when not inside and bound is choosen
  if (!isInside && bound !== "" && !keepTextFields) {
    return getBoxed(
      type,
      <Typography component="h6" textAlign="end">
        {type === "UB" ? "≤" : ""} &nbsp;
        {bound}
        &nbsp;{type === "LB" ? "≤" : ""}
      </Typography>
    );
  }

  return getBoxed(
    type,
    <TextField
      variant="outlined"
      sx={{ mx: 1 }}
      size="small"
      placeholder={type === "UB" ? "∞" : "-∞"}
      fullWidth
      slotProps={{
        input: {
          startAdornment: type === "UB" && (
            <InputAdornment position="start">&le;</InputAdornment>
          ),
          endAdornment: type === "LB" && (
            <InputAdornment position="end">&le;</InputAdornment>
          ),
        },
      }}
      value={bound}
      label={bound === "" ? undefined : type.toString()} // Bug Fix: LB not same as UB when empty
      onChange={(e: { target: { value: string } }) => setBound(e.target.value)}
    />
  );
}
