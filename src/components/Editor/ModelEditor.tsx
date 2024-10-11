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

/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button, Snackbar, useTheme } from "@mui/material";
import { FileFormat } from "../Converter/FileFormat";
import convertLP from "../Converter/Converter";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setTextFieldValue } from "@/store/slices/TextFieldInputs";
import TextEditor from "./Editor";
import { OnChange } from "@monaco-editor/react";
import { useState } from "react";

interface ModelEditor {
  format: FileFormat;
}

const ModelEditor: React.FC<ModelEditor> = ({ format }) => {
  const inputType = useSelector((state: RootState) => state.inputType);
  const textFieldInputs = useSelector(
    (state: RootState) => state.textFieldInputs
  );
  const value = textFieldInputs[inputType].textFieldValue;
  const dispatch = useDispatch();
  const setValue = (value: string) => {
    dispatch(setTextFieldValue({ value, key: inputType }));
  };
  const [errorSnackbar, setErrorSnackbar] = useState<null | string>(null);

  // Bestimme das Format basierend auf der Dateiendung
  const getFileFormat = (fileName: string | null): FileFormat | null => {
    if (fileName) {
      if (fileName.endsWith(".mod")) return FileFormat.GMPL;
      if (fileName.endsWith(".lp")) return FileFormat.CPLEX_LP;
      if (fileName.endsWith(".mps")) return FileFormat.MPS;
    }
    return null;
  };

  // Handle File Upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const currentFormat = getFileFormat(file.name);
          const convertedContent = convertLP(
            content || "",
            currentFormat,
            format
          );
          setValue(convertedContent || "");
        } catch (error) {
          if (error instanceof Error) {
            setErrorSnackbar(error.message);
          }
        }
      };
      reader.readAsText(file);
    }
  };

  const edit: OnChange = (value: string | undefined) => {
    setValue(value || "");
  };

  return (
    <div style={{ overflow: "auto" }}>
      {/* Datei hochladen */}
      {/* TODO: Import outsourcen */}
      <input
        type="file"
        accept=".mod,.lp,.mps" // Unterstützte Formate
        style={{ display: "none" }}
        id="file-upload"
        onChange={handleFileChange}
      />
      <label htmlFor="file-upload">
        <Button variant="contained" component="span">
          <FileUploadIcon sx={{ mr: 1 }} />
          Import
        </Button>
      </label>

      <TextEditor
        value={value}
        edit={edit}
        format={format}
        theme={useTheme().palette.mode === "dark" ? "dark" : "light"}
      />

      <Snackbar
        open={errorSnackbar !== null}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={10000}
        onClose={() => setErrorSnackbar(null)}
        message={"[Convert Error] " + errorSnackbar}
      />
    </div>
  );
};

export default ModelEditor;
