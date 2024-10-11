/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FileFormat } from "./FileFormat";
import glpk from "glpk.js";
import lp_to_mps from "./LP_To_MPS";
import correct_var_name from "./VarName";

const convertLP = (
  fileContent: string,
  currentFormat: FileFormat | null,
  targetFormat: FileFormat
) => {
  console.log("convert", currentFormat, "->", targetFormat);

  if (!fileContent) return;

  let newContent = fileContent; // ursprünglicher Inhalt
  // Konvertierung basierend auf den Formaten
  if (currentFormat !== targetFormat) {
    switch (currentFormat) {
      case FileFormat.GMPL:
        if (targetFormat === FileFormat.CPLEX_LP) {
          const lp = glpk.glp_create_prob();
          const tran = glpk.glp_mpl_alloc_wksp();

          let pos = 0;
          glpk.glp_mpl_read_model(
            tran,
            null,
            () => {
              if (pos < fileContent.length) {
                return fileContent[pos++];
              }
              return -1;
            },
            false
          );

          glpk.glp_mpl_generate(tran, null, console.log);
          glpk.glp_mpl_build_prob(tran, lp);
          correct_var_name(lp);

          newContent = "";
          glpk.glp_write_lp(lp, null, (chunk: string) => {
            newContent += chunk + "\n";
          });
        } else if (targetFormat === FileFormat.MPS) {
          const lp = glpk.glp_create_prob();
          const tran = glpk.glp_mpl_alloc_wksp();

          let pos = 0;
          glpk.glp_mpl_read_model(
            tran,
            null,
            () => {
              if (pos < fileContent.length) {
                return fileContent[pos++];
              }
              return -1;
            },
            false
          );

          glpk.glp_mpl_generate(tran, null, console.log);
          glpk.glp_mpl_build_prob(tran, lp);
          correct_var_name(lp);

          newContent = lp_to_mps(lp);
        } else {
          throw new Error("Unsupported format or conversion.");
        }
        break;
      case FileFormat.CPLEX_LP:
        if (targetFormat === FileFormat.GMPL) {
          throw new Error("CPLEX LP to GMPL conversion not supported.");
        } else if (targetFormat === FileFormat.MPS) {
          const lp = glpk.glp_create_prob();
          let pos = 0;
          glpk.glp_read_lp(
            lp,
            null,
            () => {
              if (pos < fileContent.length) {
                return fileContent[pos++];
              }
              return -1;
            },
            false
          );

          newContent = lp_to_mps(lp);
        } else {
          throw new Error("Unsupported format or conversion.");
        }
        break;
      case FileFormat.MPS:
        if (targetFormat === FileFormat.GMPL) {
          throw new Error("MPS to GMPL conversion not supported.");
        } else if (targetFormat === FileFormat.CPLEX_LP) {
          throw new Error("MPS to CPLEX LP conversion not supported.");
        } else {
          throw new Error("Unsupported format or conversion.");
        }
        break;
      default:
        throw new Error("Unsupported format or conversion.");
    }
  }
  return newContent;
};

export default convertLP;
