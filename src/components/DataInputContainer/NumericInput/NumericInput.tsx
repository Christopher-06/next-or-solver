"use client";
import { VarValueDataType, VarValueType } from "@/lib/types/Variable";
import { TextField } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";

export default function NumericInput({
  value,
  setValue,
  label = "Wert",
  centered = true,
  lowerBound = undefined,
  upperBound = undefined,
  valueType = "CONTINUOUS",
}: {
  value: VarValueDataType;
  setValue: (value: number) => void;
  label?: string;
  centered?: boolean;
  lowerBound: undefined | number;
  upperBound: undefined | number;
  valueType: VarValueType;
}) {
  const [text, setText] = useState("");
  const [helperText, setHelperText] = useState("");

  useEffect(() => {
    setText(value !== undefined ? value.toString() : "");
    if (value === undefined) {
      setHelperText(value ? "" : "Bitte geben Sie einen Wert ein");
    }
  }, [value]);

  const validateInput = () => {
    const newValue = parseFloat(text);

    if (isNaN(newValue)) {
      setHelperText("Es wurde ein Zahl erwartet");
      return;
    }

    if (upperBound && newValue > upperBound) {
      setHelperText("Der Wert ist größer als die obere Grenze");
      return;
    }

    if (lowerBound && newValue < lowerBound) {
      setHelperText("Der Wert ist kleiner als die untere Grenze");
      return;
    }

    if (valueType === "INTEGER" && !Number.isInteger(newValue)) {
      setHelperText("Es wurde eine ganze Zahl erwartet");
      return;
    }

    // Reset helper text and dispatch the new value
    setHelperText("");
    setValue(newValue);
  };

  return (
    <>
      <TextField
        label={label}
        variant="outlined"
        error={helperText !== ""}
        helperText={helperText}
        size="small"
        sx={{ w: 1 }}
        slotProps={{
          htmlInput: {
            style: (centered
              ? { textAlign: "center" }
              : {}) as React.CSSProperties,
          },
        }}
        value={text}
        onChange={(e: { target: { value: string } }) => setText(e.target.value)}
        onBlur={validateInput}
      />
    </>
  );
}
