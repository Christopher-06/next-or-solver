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
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { Easy_UI } from "@/lib/types/Modell";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { RootState } from "@/store/store";

export default function EASYUI_Export_Button() {
  const model = useSelector((state: RootState) => state.modell);
  const variables = useSelector((state: RootState) => state.variables);

  const saveFile = () => {
    const easy_ui: Easy_UI = { model: model, variables: variables };
    const easy_ui_str = JSON.stringify(easy_ui);

    const blob = new Blob([easy_ui_str], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `problem.json`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={saveFile}
        style={{ marginTop: "10px", marginRight: 3, marginLeft: 3 }}
      >
        <FileDownloadIcon sx={{ mr: 1 }} />
        Export
      </Button>
    </>
  );
}
