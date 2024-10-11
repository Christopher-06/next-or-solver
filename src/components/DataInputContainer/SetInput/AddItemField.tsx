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

    if(newValue.includes(" ")) {
      setHelperText(t("data_input_container.set_input.no_spaces"));
      return;
    }
    // only accept numbers, letters and underscores
    const inputRegex = /^[a-zA-Z0-9_]*$/;
    if (!inputRegex.test(newValue)) {
      setHelperText(t("data_input_container.set_input.only_letters_numbers_underscores"));
      return;
    }

    setHelperText("");
    setNewValueText("");

    if (newValue === "") {
      return;
    }


    // Update global state
    if (variable?.dataValue instanceof Set) {
      // add new value to existing set when it is not already in the set
      if (!variable.dataValue.has(newValue)) {
        const newSet = new Set(variable.dataValue);
        newSet.add(newValue);
        dispatch(setVariableValue({ _id: variable._id, value: newSet }));
      }
    } else {
      // create set from scratch
      dispatch(
        setVariableValue({ _id: variable._id, value: new Set([newValue]) })
      );
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
