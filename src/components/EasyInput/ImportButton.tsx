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
import React from "react";
import { Button, Snackbar } from "@mui/material";
import { useDispatch } from "react-redux";
import { Easy_UI } from "@/lib/types/Modell";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { setWholeModellState } from "@/store/slices/Modell";
import { setWholeVariableList } from "@/store/slices/Variables";

export default function EASYUI_Export_Button() {
  const dispatch = useDispatch();
  const [errorSnackbar, setErrorSnackbar] = React.useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const easy_ui: Easy_UI = JSON.parse(content);

          dispatch(setWholeModellState(easy_ui.model));
          dispatch(setWholeVariableList(easy_ui.variables));
        } catch (e) {
          console.error("Error parsing EasyUI Import", e);
          setErrorSnackbar("Could not parse EasyUI Import File");
        }
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

      <Snackbar
        open={errorSnackbar !== null}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={10000}
        onClose={() => setErrorSnackbar(null)}
        message={"[Import Error] " + errorSnackbar}
      />
    </>
  );
}
