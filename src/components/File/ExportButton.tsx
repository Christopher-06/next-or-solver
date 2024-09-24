// FileUploadButton.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { FileFormat } from './FileFormat';
import useGlpk from './Converter';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

interface ExportButtonProps {
    content: string;
    currentFormat: FileFormat;
    targetFormat: FileFormat; // Enum für das Ziel-Format
}

const ExportButton: React.FC<ExportButtonProps> = ({ content, currentFormat, targetFormat }) => {
    const [value, setValue] = useState("");

    // Bestimme das Format basierend auf der Dateiendung
    const getFileExtension = (format: FileFormat): string | null => {
        if (format === FileFormat.GMPL) return '.mod';
        if (format === FileFormat.CPLEX_LP) return '.lp';
        if (format === FileFormat.MPS) return '.mps';   
        return null;
    };

    const convertedContent = useGlpk(content || '', currentFormat, targetFormat); // Konvertierter Inhalt
    useEffect(() => {
        if (convertedContent) {
            setValue(convertedContent);
        }
    }, [convertedContent]);

    const saveFile = (content: string, format: FileFormat) => {
        const fileExtension = getFileExtension(format) || '';
    
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
    
        const link = document.createElement('a');
        link.href = url;
        link.download = `problem${fileExtension}`;
        link.click();
        
        // Optional: URL wieder freigeben
        URL.revokeObjectURL(url);
    };

    // Handle File Save
    const handleSaveFile = () => {
        if (value) {
            saveFile(value, targetFormat); // Datei speichern
        }
    };

    return (
        < >
            {/* Datei speichern */}
            <Button 
                variant="contained" 
                onClick={handleSaveFile} 
                style={{ marginTop: '10px', float: 'right', marginRight: 3, marginLeft: 3 }}
            >
                <FileDownloadIcon sx={{ mr: 1 }} />
                Export {targetFormat}
            </Button>
        </ >
    );
};

export default ExportButton;
