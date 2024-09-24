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

export default function SolutionContainer() {
  const inputType = useSelector((state: RootState) => state.inputType);
  const allSolveResults = useSelector((state: RootState) => state.solveResults);
  const result = allSolveResults[inputType];

  if (result.solution !== undefined) {
    return (
      <>
        {/* Lösungs Feld */}
        <Paper sx={{ m: 3, p: 3 }}>
          <Typography variant="h5">Lösung</Typography>

          {renderAlert(result.solution as HighsSolution)}

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
                <VariableTable
                  VariableColumns={Object.values(result.solution.Columns)}
                />

                {/* Show Divider */}
                <TableRow>
                  {
                    <TableCell colSpan={6}>
                      <hr />
                    </TableCell>
                  }
                </TableRow>

                {/* Constraints Table */}
                <ConstraintTable constraintsRows={result.solution.Rows} />
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </>
    );
  } else if (result.solution === undefined && result.startTime !== undefined) {
    // Calculation is running
    return (
      <Paper sx={{ m: 3, p: 3 }}>
        <Typography variant="h5">Lösung</Typography>
        <Alert severity="info">Berechnung läuft...</Alert>
      </Paper>
    );
  } else {
    // No solution available
    return <></>;
  }
}
