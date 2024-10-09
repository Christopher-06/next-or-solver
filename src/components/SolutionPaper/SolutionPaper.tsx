"use client";
import { useTranslations } from "next-intl";
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

export const renderValue = (value: number) => {
  if (value === Infinity) {
    return "∞";
  } else if (value === -Infinity) {
    return "-∞";
  }

  return value;
};

export default function SolutionContainer() {
  const t = useTranslations();
  const inputType = useSelector((state: RootState) => state.inputType);
  const allSolveResults = useSelector((state: RootState) => state.solveResults);
  const result = allSolveResults[inputType];

  const renderAlert = (solution: HighsSolution) => {
    if (solution.Status === "Optimal") {
      return (
        <Alert severity="success" sx={{ pt: 2 }}>
          <AlertTitle>
          {t("solution_paper.solution_paper.solution_found")} {solution.ObjectiveValue}
          </AlertTitle>
        </Alert>
      );
    } else {
      // TODO: Implement other cases for better user feedback
      return (
        <Alert severity="error" sx={{ pt: 2 }}>
          <AlertTitle>{t("solution_paper.solution_paper.no_solution")}</AlertTitle>
          <Typography>{solution.Status}</Typography>
        </Alert>
      );
    }
  };

  if (result.solution !== undefined) {

    const constraintRows : ConstraintRow[] = [];
    for (const constraint of Object.values(result.solution.Rows)) {
      constraintRows.push(constraint as ConstraintRow);
    }
    const VariableColumns = Object.values(result.solution.Columns);

    return (
      <>
        {/* Lösungs Feld */}
        <Paper sx={{ m: 3, p: 3 }}>
          <Typography variant="h5">{t("solution_paper.solution_paper.solution")}</Typography>

          {renderAlert(result.solution as HighsSolution)}

          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>{t("solution_paper.solution_paper.name")}</TableCell>
                  <TableCell align="right">{t("solution_paper.solution_paper.upper")}</TableCell>
                  <TableCell align="right">{t("solution_paper.solution_paper.lower")}</TableCell>
                  <TableCell align="right">{t("solution_paper.solution_paper.type")}</TableCell>
                  <TableCell align="right">{t("solution_paper.solution_paper.primal")}</TableCell>
                  <TableCell align="right">{t("solution_paper.solution_paper.dual")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Variablen Table */}
                <VariableTable
                  VariableColumns={VariableColumns}
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
                <ConstraintTable constraintsRows={constraintRows} />
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
        <Typography variant="h5">{t("solution_paper.solution_paper.solution")}</Typography>
        <Alert severity="info">{t("solution_paper.solution_paper.calculation_running")}</Alert>
      </Paper>
    );
  } else {
    // No solution available
    return <></>;
  }
}
