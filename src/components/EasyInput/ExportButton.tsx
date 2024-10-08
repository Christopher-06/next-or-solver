"use client";
import React from "react";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { Easy_UI } from "@/lib/types/Modell";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { RootState } from "@/store/store";
import { Variable, VarValueDataType } from "@/lib/types/Variable";

export default function EASYUI_Export_Button() {
  const model = useSelector((state: RootState) => state.modell);
  const variables = useSelector((state: RootState) => state.variables);

  const saveFile = () => {
    // convert all set values to array
    const variables_array: Variable[] = [];
    variables.forEach((variable) => {
      let dataValue: VarValueDataType = variable.dataValue;
      if (variable.dimensionType === "SET") {
        if (variable.dataValue instanceof Set) {
          dataValue = Array.from(variable.dataValue);
        } else {
          dataValue = [];
        }
      }

      variables_array.push({ ...variable, dataValue: dataValue });
    });

    const easy_ui: Easy_UI = { model: model, variables: variables_array };
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
