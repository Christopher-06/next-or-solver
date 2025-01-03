/*
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, version 2 of the License.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 */

"use client";
import {
  Typography,
  Paper,
  Alert,
  AlertTitle,
  LinearProgress,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Tooltip,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { HighsSolution } from "highs";
import React, { useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BasisTable, { SolutionTableDataRow } from "./BasisTable";
import LogViewer from "./LogViewer";

export const renderValue = (value: number) => {
  if (value === undefined || isNaN(value)) {
    return "-";
  } else if (value === Infinity || value >= 1.7976931348623157e308) {
    return "∞";
  } else if (value === -Infinity || value <= -1.7976931348623157e308) {
    return "-∞";
  } else if (Math.abs(value) < 1e-5) {
    return "0.0";
  } else if (Math.abs(value) > 1e4) {
    return value.toExponential(5);
  } else {
    // round value to 5 digits
    value = Math.round(value * 1e5) / 1e5;
    let s = value.toString();
    s = s.length > 10 ? s.slice(0, 10) : s; // keep it short
    while (s[s.length - 1] === "0") {
      // remove trailing zeros
      s = s.slice(0, -1);
    }

    if (s[s.length - 1] === ".") {
      // remove trailing dot
      s += "0";
    }

    return s;
  }
};

const renderTimeDelta = (timeDelta: number) => {
  if (timeDelta > 60 * 1000) {
    // minutes
    // return "mm:ss";
    const minutes = Math.floor(timeDelta / 60000);
    const seconds = Math.floor((timeDelta % 60000) / 1000);
    return `${minutes}:${seconds} min`;
  } else if (timeDelta > 1000) {
    // seconds
    return `${(timeDelta / 1000).toFixed(2)} s`;
  }

  return `${timeDelta} ms`;
};

export default function SolutionContainer() {
  const inputType = useSelector((state: RootState) => state.inputType);
  const allSolveResults = useSelector((state: RootState) => state.solveResults);
  const result = allSolveResults[inputType];
  const t = useTranslations();

  const [timeDelta, setTimeDelta] = React.useState<number>(0);

  const renderAlert = (
    solution: HighsSolution,
    startTime: number | undefined,
    endTime: number | undefined
  ) => {
    {
      /* Show the time it took to solve the problem */
    }
    const wallTimeDisplay =
      endTime && startTime ? renderTimeDelta(endTime - startTime) : null;

    if (solution.Status === "Optimal") {
      return (
        <Alert severity="success" sx={{ pt: 2 }}>
          <AlertTitle>
            {t("solution_paper.solution_paper.solution_found")} (
            {wallTimeDisplay})
          </AlertTitle>

          <Typography variant="h3">{solution.ObjectiveValue}</Typography>
        </Alert>
      );
    } else if (solution.Status === "Infeasible") {
      return (
        <Alert severity="error" sx={{ pt: 2 }}>
          <AlertTitle>
            {t("solution_paper.solution_paper.not_solvable")} ({wallTimeDisplay}
            )
          </AlertTitle>
        </Alert>
      );
    } else if (solution.Status === "Unbounded") {
      return (
        <Alert severity="error" sx={{ pt: 2 }}>
          <AlertTitle>
            {t("solution_paper.solution_paper.unrestricted")} ({wallTimeDisplay}
            )
          </AlertTitle>
        </Alert>
      );
    } else if (
      solution.Status === "Primal infeasible or unbounded" ||
      solution.Status === "Bound on objective reached"
    ) {
      return (
        <Alert severity="error" sx={{ pt: 2 }}>
          <AlertTitle>
            {t("solution_paper.solution_paper.primal_unlimited_or_unsolvable")}{" "}
            ({wallTimeDisplay})
          </AlertTitle>
        </Alert>
      );
    } else {
      return (
        <Alert severity="error" sx={{ pt: 2 }}>
          <AlertTitle>
            {t("solution_paper.solution_paper.no_solution")} ({wallTimeDisplay})
          </AlertTitle>
          <Typography variant="caption">{solution.Status}</Typography>

          <Typography variant="h3">{solution.ObjectiveValue}</Typography>
        </Alert>
      );
    }
  };

  const renderinPaper = (children: React.ReactNode) => {
    return (
      <Paper sx={{ m: 3, p: 3 }}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          {t("solution_paper.solution_paper.solution")}
        </Typography>
        {children}
      </Paper>
    );
  };

  const rerenderInterval = (timeDelta: number) => {
    if (timeDelta < 60000) {
      // < 1min => 10 - 100ms
      return 10 + Math.random() * 90;
    } else if (timeDelta <= 600000) {
      // <10min => 500 - 1000ms
      return 500 + Math.random() * 500;
    } else {
      // >10min => 1000ms - 2000ms
      return 1000 + Math.random() * 1000;
    }
  };

  // Rerender every 70ms to 5 seconds to update the time delta
  useEffect(() => {
    // Finished calculation
    if (result.endTime !== undefined && result.startTime !== undefined) {
      setTimeDelta(result.endTime - result.startTime);
      return;
    }

    // Check if timeDelta greater than current Time (repressed Solve Button)
    if (
      result.startTime !== undefined &&
      timeDelta > performance.now() - result.startTime
    ) {
      setTimeDelta(performance.now() - result.startTime);
      return;
    }

    // Update time delta every rerenderInterval
    const interval = setInterval(() => {
      if (result.endTime === undefined && result.startTime !== undefined) {
        setTimeDelta(performance.now() - result.startTime);
      }
    }, rerenderInterval(timeDelta));

    return () => {
      clearInterval(interval);
    };
  }, [result, timeDelta]);

  if (result.solution !== undefined) {
    // prepare data for tables
    const constraintRows: SolutionTableDataRow[] = [];
    for (const constraint of Object.values(result.solution.Rows)) {
      constraintRows.push(constraint as unknown as SolutionTableDataRow);
    }
    const VariableColumns: SolutionTableDataRow[] = Object.values(
      result.solution.Columns
    );

    // show solution
    return renderinPaper(
      <>
        {renderAlert(result.solution, result.startTime, result.endTime)}

        <Box sx={{ my: 3 }}>
          {/* Show Decision Variables  */}
          <Accordion elevation={3} defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              {t("solution_paper.solution_paper.Decision_Variables")}
            </AccordionSummary>
            <AccordionDetails>
              <BasisTable dataRows={VariableColumns} />
            </AccordionDetails>
          </Accordion>

          {/* Show Constraints  */}
          <Accordion elevation={3}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              {t("solution_paper.solution_paper.Constraints")}
            </AccordionSummary>
            <AccordionDetails>
              <BasisTable dataRows={constraintRows} />
            </AccordionDetails>
          </Accordion>

          {/* Solver Output View  */}
          <Tooltip
            title={
              result.solverOutput.length === 0
                ? t("solution_paper.solution_paper.no_solver_outputs")
                : ""
            }
          >
            <Accordion
              elevation={3}
              disabled={result.solverOutput.length === 0}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                {t("solution_paper.solution_paper.Solver_Output")}
              </AccordionSummary>
              <AccordionDetails>
                <LogViewer logs={result.solverOutput} exportFileNamePrefix="Solver-Output" />
              </AccordionDetails>
            </Accordion>
          </Tooltip>

          {/* Solver Logs View  */}
          <Tooltip
            title={
              result.solverLog.length === 0
                ? t("solution_paper.solution_paper.no_solver_logs")
                : ""
            }
          >
            <Accordion elevation={3} disabled={result.solverLog.length === 0}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                {t("solution_paper.solution_paper.Solver_Logs")}
              </AccordionSummary>
              <AccordionDetails>
                <LogViewer logs={result.solverLog} exportFileNamePrefix="Solver-Logs"/>
              </AccordionDetails>
            </Accordion>
          </Tooltip>
        </Box>
      </>
    );
  } else if (result.error !== undefined) {
    // show error message
    return renderinPaper(
      <>
        <Alert severity="error">
          <AlertTitle>{t("solution_paper.solution_paper.error")}</AlertTitle>
          <Typography>{result.error.message}</Typography>
        </Alert>

        {/* Show Log on error */}
        {result.solverLog.length > 0 ? (
          <Box sx={{ my: 3 }}>
            <LogViewer logs={result.solverLog} exportFileNamePrefix="Solver-Log with Errors" />
          </Box>
        ) : null}
      </>
    );
  } else if (result.startTime !== undefined) {
    // Show loading message
    return renderinPaper(
      <>
        <LinearProgress />
        <Alert severity="info">
          {t("solution_paper.solution_paper.calculation_running")}
          <Typography variant="h3">{renderTimeDelta(timeDelta)}</Typography>
        </Alert>

        {/* Show Log while solving */}
        {result.solverLog.length > 0 ? (
          <Box sx={{ my: 3 }}>
            <LogViewer logs={result.solverLog} exportFileNamePrefix="Solver-Log Loading" />
          </Box>
        ) : null}
      </>
    );
  }

  // No solution available
  return <></>;
}
