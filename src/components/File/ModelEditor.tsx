// FileUploadButton.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { Button, TextareaAutosize } from '@mui/material';
import { FileFormat } from './FileFormat';
import convertLP from './Converter';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ExportButton from './ExportButton';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setTextFieldValue } from "@/store/slices/TextFieldInputs";
        
interface ModelEditor {
    targetFormat: FileFormat; // Enum für das Ziel-Format
}

const ModelEditor: React.FC<ModelEditor> = ({ targetFormat }) => {
    const [fileContent, setFileContent] = useState<string | null>(null);
    const [fileFormat, setFileFormat] = useState<FileFormat | null>(null);

    
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
            if (fileName.endsWith('.mod')) return FileFormat.GMPL;
            if (fileName.endsWith('.lp')) return FileFormat.CPLEX_LP;
            if (fileName.endsWith('.mps')) return FileFormat.MPS;
        }
        return null;
    };

    const convertedContent = convertLP(fileContent || '', fileFormat, targetFormat); // Konvertierter Inhalt
    useEffect(() => {
        if (convertedContent) {
            setValue(convertedContent);
        }
    }, [convertedContent]);

    // Handle File Upload
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result as string;
                const format = getFileFormat(file.name);
                setFileContent(content); // Setze den Inhalt der Datei
                setFileFormat(format);
                setValue(convertedContent || '');
            };
            reader.readAsText(file);
        }
    };

    const edit = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value == "") {
            console.log("Test");
        };
        setValue(e.target.value);
    };

    return (
        <div style={{ overflow: 'auto'}}>
            {/* Datei hochladen */}
            {/* TODO: Import outsourcen */}
            <input
                type="file"
                accept=".mod,.lp,.mps" // Unterstützte Formate
                style={{ display: 'none' }}
                id="file-upload"
                onChange={handleFileChange}
            />
            <label htmlFor="file-upload">
                <Button variant="contained" component="span">
                    <FileUploadIcon sx={{ mr: 1 }} />
                    Import
                </Button>
            </label>

            {/* Textarea mit dem konvertierten Inhalt */}
            <TextareaAutosize
                minRows={30}
                maxRows={30}
                style={{ width: '100%', marginTop: '20px', resize: 'none', fontSize: '16px' }}
                value={value || ''}
                onChange={edit} // Aktualisiere den State bei Änderungen
                placeholder={`${targetFormat} Model...`}
            />

            {/* Solve */}
            <Button
                variant="contained"
                // onClick={}
                style={{ marginTop: '10px' }}
            >
                <PlayCircleOutlineIcon sx={{ mr: 1 }} />
                Solve
            </Button>

            {/* Datei speichern */}
            <ExportButton content={value} currentFormat={targetFormat} targetFormat={FileFormat.MPS} />
            <ExportButton content={value} currentFormat={targetFormat} targetFormat={FileFormat.CPLEX_LP} />
            <ExportButton content={value} currentFormat={targetFormat} targetFormat={FileFormat.GMPL} />
        </div>
    );
};
  
  export default ModelEditor;
