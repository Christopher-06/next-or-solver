"use client";

import { Button, useTheme } from "@mui/material";
import { FileFormat } from "../Converter/FileFormat";
import convertLP from "../Converter/Converter";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setTextFieldValue } from "@/store/slices/TextFieldInputs";
import TextEditor from "./Editor";
import { OnChange } from "@monaco-editor/react";

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
        const content = e.target?.result as string;
        const currentFormat = getFileFormat(file.name);
        const convertedContent = convertLP(content || "", currentFormat, format);
        setValue(convertedContent || "");
      };
      reader.readAsText(file);
    }
  };

  const edit: OnChange = (value: string | undefined) => {
    setValue(value || '');
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

      {/* Textarea mit dem konvertierten Inhalt
      <TextareaAutosize
        minRows={30}
        maxRows={30}
        style={{
          width: "100%",
          marginTop: "20px",
          resize: "none",
          fontSize: "16px",
        }}
        value={value || ""}
        onChange={edit} // Aktualisiere den State bei Änderungen
        placeholder={`${format} Model...`}
      /> */}
      <TextEditor
        value={value}
        edit={edit} 
        format={format} 
        theme={useTheme().palette.mode === 'dark' ? 'dark' : 'light'}/>
    </div>
  );
};

export default ModelEditor;
