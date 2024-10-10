"use client";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { useMouseContext } from "../MouseProvider/MouseProvider";
import { useEffect, useState } from "react";
import React from "react";

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
  bound: undefined | number;
  setBound: (bound: undefined | number) => void;
  type: "UB" | "LB";
  keepTextFields?: boolean;
}) {
  const { isInside } = useMouseContext();

  const [text, setText] = useState(bound !== undefined ? bound.toString() : "");
  const [helperText, setHelperText] = useState("");

  // Update TextField when bound changes
  useEffect(() => {
    setText(bound !== undefined ? bound.toString() : "");
    setHelperText("");
  }, [bound]);

  // Validate Input
  const validateInput = () => {
    if (text === "") {
      setBound(undefined);
      setHelperText("");
      return;
    }

    const newValue = parseFloat(text);

    if (isNaN(newValue)) {
      setHelperText("Es wurde ein Zahl erwartet");
      setBound(undefined);
      return;
    }

    // Reset helper text and dispatch the new value
    setHelperText("");
    setBound(newValue);
  };

  // Validate when showAsTypography is true new
  useEffect(() => {
    if (!isInside && !keepTextFields) {
      validateInput();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInside && !keepTextFields]);

  // Draw nothing when not inside and no upperBound is choosen
  if (
    !isInside &&
    bound === undefined &&
    !keepTextFields &&
    helperText === ""
  ) {
    return <></>;
  }

  // Draw Value when not inside and bound is choosen
  if (!isInside && bound !== undefined && !keepTextFields) {
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
      value={text}
      label={text === "" ? undefined : type.toString()} // Bug Fix: LB not same as UB when empty
      onChange={(e: { target: { value: string } }) => setText(e.target.value)}
      onBlur={validateInput}
      error={helperText !== ""}
      helperText={helperText}
    />
  );
}
