// FileUploadButton.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { Button, TextareaAutosize } from '@mui/material';
import { FileFormat } from './FileFormat';
import useGlpk from './useGlpk';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

interface FileUploadButtonProps {
    targetFormat: FileFormat; // Enum für das Ziel-Format
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({ targetFormat }) => {
    const [fileContent, setFileContent] = useState<string | null>(null);
    const [fileFormat, setFileFormat] = useState<FileFormat | null>(null);
    const [value, setValue] = useState("");

    // Bestimme das Format basierend auf der Dateiendung
    const getFileFormat = (fileName: string | null): FileFormat | null => {
        if (fileName) {
            if (fileName.endsWith('.mod')) return FileFormat.GMPL;
            if (fileName.endsWith('.lp')) return FileFormat.CPLEX_LP;
            if (fileName.endsWith('.mps')) return FileFormat.MPS;
        }
        return null;
    };

    const convertedContent = useGlpk(fileContent || '', fileFormat, targetFormat); // Konvertierter Inhalt
    useEffect(() => {
        if (convertedContent) {
            setValue(convertedContent);
        }
    }, [convertedContent]);

    const saveFile = (content: string, format: FileFormat) => {
        const fileExtension = format === FileFormat.GMPL ? '.mod' : 
                              format === FileFormat.CPLEX_LP ? '.lp' : 
                              '.mps'; // Standardmäßig .mps für MPS Format
    
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
    
        const link = document.createElement('a');
        link.href = url;
        link.download = `converted-file${fileExtension}`;
        link.click();
        
        // Optional: URL wieder freigeben
        URL.revokeObjectURL(url);
    };

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

    // Handle File Save
    const handleSaveFile = () => {
        if (value) {
            saveFile(value, targetFormat); // Datei speichern
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
                style={{ width: '100%', marginTop: '20px', resize: 'none' }}
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
            <Button 
                variant="contained" 
                onClick={handleSaveFile} 
                style={{ marginTop: '10px', float: 'right' }}
            >
                <FileDownloadIcon sx={{ mr: 1 }} />
                Export
            </Button>
        </div>
    );
};

export default FileUploadButton;
