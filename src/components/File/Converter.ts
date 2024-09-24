"use client";
import { useEffect, useState } from 'react';
import { FileFormat } from './FileFormat';

declare global {
    interface Window {
        glp_create_prob: any;
        glp_read_lp_from_string: any;
        glp_scale_prob: any;
        GLP_SF_AUTO: any;
        SMCP: any;
        glp_simplex: any;
        glp_get_num_cols: any;
        glp_get_col_name: any;
        glp_get_col_prim: any;
        glp_get_obj_val: any;
        glp_mpl_read_model_from_string: any;
        glp_write_lp: any;
    }
}

const convertLP = (fileContent: string, currentFormat: FileFormat | null, targetFormat: FileFormat) => {
    const [convertedContent, setConvertedContent] = useState<string | null>(null);

    useEffect(() => {
        // Dynamisch das GLPK-Skript laden
        const loadGLPK = async () => {
            const script = document.createElement('script');
                script.src = '/glpk.min.js'; // Pfad zu deiner glpk.min.js im public-Verzeichnis
                script.onload = () => {
                    convertFile();
                };
            document.body.appendChild(script);
        };

        const convertFile = async () => {
            try {
                if (!fileContent) return;

                var newContent = fileContent; // Standardinhalt
                // Konvertierung basierend auf den Formaten
                if (currentFormat !== targetFormat) {
                    const lp = window.glp_create_prob();
                    switch (currentFormat) {
                        case FileFormat.GMPL:
                            // window.glp_mpl_read_model_from_string(lp, null, fileContent);
                            if (targetFormat === FileFormat.CPLEX_LP) {
                                // const outputBuffer = {
                                //     data: '',
                                //     write: function (text: string) {
                                //       this.data += text;
                                //     },
                                // };
                                // window.glp_write_lp(lp, null, (chunk: string) => outputBuffer.write(chunk));
                                // newContent = outputBuffer.data;
                                newContent = "GMPL to LP_CPLEX conversion";
                            } else if (targetFormat === FileFormat.MPS) {
                                newContent = "GMPL to MPS conversion";
                            } else {
                                throw new Error("Unsupported format or conversion.");
                            }
                            break;
                        case FileFormat.CPLEX_LP:
                            // window.glp_read_lp_from_string(lp, null, fileContent);
                            // console.log(lp);
                            if (targetFormat === FileFormat.GMPL) {
                                newContent = "LP_CPLEX to GMPL conversion";
                            } else if (targetFormat === FileFormat.MPS) {
                                newContent = "LP_CPLEX to MPS conversion";
                            } else {
                                throw new Error("Unsupported format or conversion.");
                            }
                            break;
                        case FileFormat.MPS:
                            if (targetFormat === FileFormat.GMPL) {
                                newContent = "MPS to GMPL conversion";
                            } else if (targetFormat === FileFormat.CPLEX_LP) {
                                newContent = "MPS to LP_CPLEX conversion";
                            } else {
                                throw new Error("Unsupported format or conversion.");
                            }
                            break;
                        default:
                            throw new Error("Unsupported format or conversion.");
                    }
                }
                setConvertedContent(newContent); // Setze den konvertierten Inhalt
            } catch (error) {
                console.error('Fehler bei der Konvertierung: ', error);
            }
        };

        loadGLPK();
    }, [fileContent, currentFormat, targetFormat]);

    return convertedContent;
};

export default convertLP;
