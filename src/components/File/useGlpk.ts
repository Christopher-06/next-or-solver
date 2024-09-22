// useGlpk.ts
import { useEffect, useState } from 'react';
import glpk from 'glpk.js';
import { FileFormat } from './FileFormat';

const useGlpk = (fileContent: string, currentFormat: FileFormat | null, targetFormat: FileFormat) => {
    const [convertedContent, setConvertedContent] = useState<string | null>(null);

    useEffect(() => {
        const convertFile = async () => {
            if (!fileContent) return;

            let newContent = fileContent; // Standardinhalt
            console.log(currentFormat + " => " + targetFormat);
            // Konvertierung basierend auf den Formaten
            if (currentFormat !== targetFormat) {
                const glpkInstance = await glpk; // Stelle sicher, dass glpk.js korrekt initialisiert wird
                switch (currentFormat) {
                    case FileFormat.GMPL:
                        if (targetFormat === FileFormat.CPLEX_LP) {
                            newContent = glpkInstance.glp_write_lp(glpkInstance.glp_mpl_read_model_from_string(fileContent));
                        } else if (targetFormat === FileFormat.MPS) {
                            newContent = glpkInstance.glp_write_lp(glpkInstance.glp_mpl_read_model_from_string(fileContent));
                        }
                        break;
                    case FileFormat.CPLEX_LP:
                        if (targetFormat === FileFormat.GMPL) {
                            newContent = glpkInstance.write_model(glpkInstance.glp_read_lp_from_string(fileContent));
                        } else if (targetFormat === FileFormat.MPS) {
                            newContent = glpkInstance.write_mps(glpkInstance.glp_read_lp_from_string(fileContent));
                        }
                        break;
                    case FileFormat.MPS:
                        if (targetFormat === FileFormat.GMPL) {
                            newContent = glpkInstance.write_model(glpkInstance.glp_read_mps(fileContent));
                        } else if (targetFormat === FileFormat.CPLEX_LP) {
                            newContent = glpkInstance.write_lp(glpkInstance.glp_read_mps(fileContent));
                        }
                        break;
                    default:
                        throw new Error("Unsupported format or conversion.");
                }
            }

            setConvertedContent(newContent); // Setze den konvertierten Inhalt
        };

        convertFile(); // Aufruf der Funktion zur Konvertierung
    }, [fileContent, currentFormat, targetFormat]);

    return convertedContent;
};

export default useGlpk;
