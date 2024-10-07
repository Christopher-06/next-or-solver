"use client";

import { Button } from '@mui/material';
import { FileFormat } from './FileFormat';
import convertLP from './Converter';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

interface ExportButtonProps {
    content: string;
    currentFormat: FileFormat;
    targetFormat: FileFormat; // Enum für das Ziel-Format
}

const ExportButton: React.FC<ExportButtonProps> = ({ content, currentFormat, targetFormat }) => {

    // Bestimme das Format basierend auf der Dateiendung
    const getFileExtension = (format: FileFormat): string | null => {
        if (format === FileFormat.GMPL) return '.mod';
        if (format === FileFormat.CPLEX_LP) return '.lp';
        if (format === FileFormat.MPS) return '.mps';   
        return null;
    };

    const saveFile = () => {
        const convertedContent = convertLP(content || '', currentFormat, targetFormat); // Konvertierter Inhalt
        const fileExtension = getFileExtension(targetFormat) || '';
    
        const blob = new Blob([convertedContent || ""], { type: 'text/plain' });
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
        if (content) {
            saveFile(); // Datei speichern
        }
    };

    return (
        < >
            {/* Datei speichern */}
            <Button 
                variant="contained" 
                onClick={handleSaveFile} 
                style={{ float: 'right', marginRight: 3, marginLeft: 3 }}
            >
                <FileDownloadIcon sx={{ mr: 1 }} />
                Export {targetFormat}
            </Button>
        </ >
    );
};

export default ExportButton;
