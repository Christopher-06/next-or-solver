"use client";
import {
  Typography,
  Paper,
  Alert,
  AlertTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ConstraintTable from "./ConstraintTable";
import VariableTable from "./VariableTable";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { HighsSolution } from "highs";
import { ConstraintRow } from "@/lib/types/Solution";
import React from "react";

export const renderValue = (value: number) => {
  if (value === Infinity) {
    return "∞";
  } else if (value === -Infinity) {
    return "-∞";
  }

  return value;
};

const renderAlert = (solution: HighsSolution) => {
  if (solution.Status === "Optimal") {
    return (
      <Alert severity="success" sx={{ pt: 2 }}>
        <AlertTitle>
          Optimaler Zielfunktionswert von {solution.ObjectiveValue}
        </AlertTitle>
      </Alert>
    );
  } else {
    // TODO: Implement other cases for better user feedback
    return (
      <Alert severity="error" sx={{ pt: 2 }}>
        <AlertTitle>Keine optimale Lösung gefunden</AlertTitle>
        <Typography>{solution.Status}</Typography>
      </Alert>
    );
  }
};

const renderinPaper = (children: React.ReactNode) => {
  return (
    <Paper sx={{ m: 3, p: 3 }}>
      <Typography variant="h5">Lösung</Typography>
      {children}
    </Paper>
  );
};

export default function SolutionContainer() {
  const inputType = useSelector((state: RootState) => state.inputType);
  const allSolveResults = useSelector((state: RootState) => state.solveResults);
  const result = allSolveResults[inputType];

  if (result.solution === undefined) {
    // Show loading message
    if (result.startTime !== undefined) {
      return <Alert severity="info">Berechnung läuft...</Alert>;
    }

    // No solution available
    return <></>;
  } else {
    // prepare data for tables
    const constraintRows: ConstraintRow[] = [];
    for (const constraint of Object.values(result.solution.Rows)) {
      constraintRows.push(constraint as ConstraintRow);
    }
    const VariableColumns = Object.values(result.solution.Columns);

    return renderinPaper(<>
      {renderAlert(result.solution)}
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Upper</TableCell>
              <TableCell align="right">Lower</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Primal</TableCell>
              <TableCell align="right">Dual</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Variablen Table */}
            <VariableTable VariableColumns={VariableColumns} />

            {/* Show Divider */}
            {VariableColumns.length > 0 && constraintRows.length > 0 && (
              <TableRow>
                {
                  <TableCell colSpan={6}>
                    <hr />
                  </TableCell>
                }
              </TableRow>
            )}

            {/* Constraints Table */}
            <ConstraintTable constraintsRows={constraintRows} />
          </TableBody>
        </Table>
      </TableContainer>
    </>);
  }
}
