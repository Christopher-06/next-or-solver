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

export const renderValue = (value: number) => {
  if (value === Infinity) {
    return "∞";
  } else if (value === -Infinity) {
    return "-∞";
  }

  return value;
};

const renderAlert = (solution: { Status: string; ObjectiveValue?: number }) => {
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
  const solutionSelected = useSelector((state: RootState) => state.solution);

  // Do not render if no solution is available
  if (solutionSelected.length === 0) {
    return null;
  }

  const solution = solutionSelected[0];

  return (
    <>
      {/* Lösungs Feld */}
      <Paper sx={{ m: 3, p: 3 }}>
        <Typography variant="h5">Lösung</Typography>

        {renderAlert(solution)}

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
                VariableColumns={Object.values(solution.Columns)}
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
              <ConstraintTable constraintsRows={solution.Rows} />
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
