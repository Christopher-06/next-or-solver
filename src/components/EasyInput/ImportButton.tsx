"use client";
import React from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { Easy_UI } from "@/lib/types/Modell";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { setWholeModellState } from "@/store/slices/Modell";
import { setWholeVariableList } from "@/store/slices/Variables";

export default function EASYUI_Export_Button() {
  const dispatch = useDispatch();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const easy_ui: Easy_UI = JSON.parse(content);

        // transform string[] to Set<string> by set variable types
        easy_ui.variables.forEach((variable) => {
          if (
            variable.dimensionType === "SET" &&
            Array.isArray(variable.dataValue)
          ) {
            if (variable.dataValue.length === 0) {
              variable.dataValue = new Set();
            } else {
              variable.dataValue = new Set(
                variable.dataValue.filter((v) => typeof v === "string")
              );
            }
          }
        });

        dispatch(setWholeModellState(easy_ui.model));
        dispatch(setWholeVariableList(easy_ui.variables));
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      <input
        type="file"
        accept=".json"
        style={{ display: "none" }}
        id="file-upload"
        onChange={handleFileChange}
      />
      <label htmlFor="file-upload">
        <Button
          variant="contained"
          component="span"
          style={{ marginTop: "10px", marginRight: 3, marginLeft: 3 }}
        >
          <FileUploadIcon sx={{ mr: 1 }} />
          Import
        </Button>
      </label>
    </>
  );
}
