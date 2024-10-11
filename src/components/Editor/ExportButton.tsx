"use client";

import { Button } from "@mui/material";
import { FileFormat } from "../Converter/FileFormat";
import convertLP from "../Converter/Converter";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Modell } from "@/lib/types/Modell";
import { Variable } from "@/lib/types/Variable";
import ConvertToGMPL from "@/lib/easy-ui/converter";

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
  // Bestimme das Format basierend auf der Dateiendung
  const getFileExtension = (format: FileFormat): string | null => {
    if (format === FileFormat.GMPL) return ".mod";
    if (format === FileFormat.CPLEX_LP) return ".lp";
    if (format === FileFormat.MPS) return ".mps";
    return null;
  };

  // inject conversion from EASY UI to GMPL
  if (currentFormat == FileFormat.EASY_UI && easyUiModell && easyUiVariables) {
    console.log("Converting EASY UI to GMPL");
    content = ConvertToGMPL(easyUiModell, easyUiVariables);
    currentFormat = FileFormat.GMPL;
  }

  const saveFile = () => {
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
  };

  // Handle File Save
  const handleSaveFile = () => {
    if (content) {
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
    </>
  );
};

export default ExportButton;
