"use client";

import { Button, Snackbar } from "@mui/material";
import { FileFormat } from "../Converter/FileFormat";
import convertLP from "../Converter/Converter";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Modell } from "@/lib/types/Modell";
import { Variable } from "@/lib/types/Variable";
import ConvertToGMPL from "@/lib/easy-ui/converter";
import { useDispatch } from "react-redux";
import { setInputError } from "@/store/slices/TextFieldInputs";
import { InputType } from "@/store/slices/InputType";
import { useState } from "react";

interface ExportButtonProps {
  content: string;
  currentFormat: FileFormat;
  targetFormat: FileFormat; // Enum für das Ziel-Format
  easyUiModell?: Modell;
  easyUiVariables?: Variable[];
}

const ExportButton: React.FC<ExportButtonProps> = ({
  content,
  currentFormat,
  targetFormat,
  easyUiModell = null,
  easyUiVariables = null,
}) => {
  const dispatch = useDispatch();

  const [errorSnackbar, setErrorSnackbar] = useState<null | string>(null);

  // Bestimme das Format basierend auf der Dateiendung
  const getFileExtension = (format: FileFormat): string | null => {
    if (format === FileFormat.GMPL) return ".mod";
    if (format === FileFormat.CPLEX_LP) return ".lp";
    if (format === FileFormat.MPS) return ".mps";
    return null;
  };

  // Bestimme das InputType basierend auf dem Format
  const FileFormatToInput = (format: FileFormat): InputType | null => {
    if (format === FileFormat.GMPL) return "GMPL";
    if (format === FileFormat.CPLEX_LP) return "CPLEX_LP";
    if (format === FileFormat.MPS) return "MPS";
    if (format === FileFormat.EASY_UI) return "EASY_UI";
    return null;
  };
  const inputTypeFormat: InputType | null = FileFormatToInput(currentFormat);

  const saveFile = () => {
    try {
      // inject conversion from EASY UI to GMPL
      if (
        currentFormat == FileFormat.EASY_UI &&
        easyUiModell &&
        easyUiVariables
      ) {
        console.log("Converting EASY UI to GMPL");
        content = ConvertToGMPL(easyUiModell, easyUiVariables, true);
        currentFormat = FileFormat.GMPL;
      }

      const convertedContent = convertLP(
        content || "",
        currentFormat,
        targetFormat
      ); // Konvertierter Inhalt
      const fileExtension = getFileExtension(targetFormat) || "";

      const blob = new Blob([convertedContent || ""], { type: "text/plain" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `problem${fileExtension}`;
      link.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.log("Error while saving file: ", error);
      if (error instanceof Error) {
        dispatch(setInputError({ error: error, key: inputTypeFormat }));
        setErrorSnackbar(error.message);
      }
    }
  };

  // Handle File Save
  const handleSaveFile = () => {
    if (content || currentFormat === FileFormat.EASY_UI) {
      saveFile(); // Datei speichern
    }
  };

  return (
    <>
      {/* Datei speichern */}
      <Button
        variant="contained"
        onClick={handleSaveFile}
        style={{
          marginTop: "10px",
          float: "right",
          marginRight: 3,
          marginLeft: 3,
        }}
      >
        <FileDownloadIcon sx={{ mr: 1 }} />
        Export {targetFormat}
      </Button>

      <Snackbar
        open={errorSnackbar !== null}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={10000}
        onClose={() => setErrorSnackbar(null)}
        message={"[Convert Error] " + errorSnackbar}
      />
    </>
  );
};

export default ExportButton;
