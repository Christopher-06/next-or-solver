"use client";
import { VarValueDataType, VarValueType } from "@/lib/types/Variable";
import { TextField, Tooltip } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function NumericInput({
  value,
  setValue,
  label = undefined,
  centered = true,
  lowerBound = undefined,
  upperBound = undefined,
  valueType = "CONTINUOUS",
  showHelperText = true,
  showHelperTextInTooltip = false,
}: {
  value: VarValueDataType;
  setValue: (value: number) => void;
  label?: string;
  centered?: boolean;
  lowerBound?: undefined | number;
  upperBound?: undefined | number;
  valueType: VarValueType;
  showHelperText?: boolean;
  showHelperTextInTooltip?: boolean;
}) {
  const t = useTranslations();
  const [text, setText] = useState("");
  const [helperText, setHelperText] = useState("");

  if (label == undefined) {
    label = t("data_input_container.nummeric_input.value");
  }

  useEffect(() => {
    if (!Number.isNaN(value)) {
      setText(value !== undefined ? value.toString() : "");
    }

    if (value === undefined) {
      setHelperText(
        value ? "" : t("data_input_container.nummeric_input.type_in_value")
      );
    }
  }, [value, t]);

  const validateInput = () => {
    const newValue = parseFloat(text);

    if (isNaN(newValue)) {
      setHelperText(t("data_input_container.nummeric_input.number_requiered"));
      setValue(NaN);
      return;
    }

    if (upperBound && newValue > upperBound) {
      setHelperText(
        t("data_input_container.nummeric_input.value_greater_then_UP")
      );
      setValue(NaN);
      return;
    }

    if (lowerBound && newValue < lowerBound) {
      setHelperText(
        t("data_input_container.nummeric_input.value_lower_then_LB")
      );
      setValue(NaN);
      return;
    }

    if (valueType === "INTEGER" && !Number.isInteger(newValue)) {
      setHelperText(t("data_input_container.nummeric_input.integer_required"));
      setValue(NaN);
      return;
    }

    // Reset helper text and dispatch the new value
    setHelperText("");
    setValue(newValue);
  };

  return (
    <>
      <Tooltip title={showHelperTextInTooltip && helperText}>
        <TextField
          label={label}
          variant="outlined"
          error={helperText !== ""}
          helperText={showHelperText ? helperText : ""}
          size="small"
          slotProps={{
            htmlInput: {
              style: (centered
                ? { textAlign: "center" }
                : {}) as React.CSSProperties,
            },
          }}
          value={text !== "Nan" ? text : ""}
          onChange={(e: { target: { value: string } }) =>
            setText(e.target.value)
          }
          onBlur={validateInput}
        />
      </Tooltip>
    </>
  );
}
