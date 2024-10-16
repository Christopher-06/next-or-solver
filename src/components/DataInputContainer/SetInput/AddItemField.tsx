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

"use client";
import { Variable } from "@/lib/types/Variable";
import { Box, Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { setVariableValue } from "@/store/slices/Variables";
import { useDispatch } from "react-redux";
import { useTranslations } from "next-intl";

export default function AddItemField({ variable }: { variable: Variable }) {
  const dispatch = useDispatch();
  const [newValueText, setNewValueText] = useState("");
  const [helperText, setHelperText] = useState("");
  const t = useTranslations();

  const onClickAdd = () => {
    const newValue = newValueText.trim();

    if (newValue.includes(" ")) {
      setHelperText(t("data_input_container.set_input.no_spaces"));
      return;
    }
    // only accept numbers, letters and underscores
    const inputRegex = /^[a-zA-Z0-9_]*$/;
    if (!inputRegex.test(newValue)) {
      setHelperText(
        t("data_input_container.set_input.only_letters_numbers_underscores")
      );
      return;
    }

    setHelperText("");
    setNewValueText("");

    if (newValue === "") {
      return;
    }

    // Update global state
    if (
      !Array.isArray(variable?.dataValue) ||
      variable.dataValue.length === 0
    ) {
      // create array from scratch
      dispatch(setVariableValue({ _id: variable._id, value: [newValue] }));
    } else {
      // add new value to existing array when it is not already inside
      if (variable.dataValue.filter((k) => k === newValue).length === 0) {
        const newArray: string[] = variable.dataValue
          .filter((k) => typeof k == "string" && k != "")
          .map((k) => k as string);
        newArray.push(newValue);
        dispatch(setVariableValue({ _id: variable._id, value: newArray }));
      }
    }
  };

  return (
    <Box display="flex" alignItems="center">
      <TextField
        sx={{ mx: 1 }}
        size="small"
        label={t("data_input_container.set_input.new_value")}
        variant="outlined"
        value={newValueText}
        helperText={helperText}
        error={helperText !== ""}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onClickAdd();
          }
        }}
        onChange={(e: { target: { value: string } }) =>
          setNewValueText(e.target.value)
        }
        fullWidth
      />

      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={onClickAdd}
      >
        <AddIcon />
      </Button>
    </Box>
  );
}
