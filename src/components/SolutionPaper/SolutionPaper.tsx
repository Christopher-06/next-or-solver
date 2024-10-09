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
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { HighsSolution } from "highs";
import React, { useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BasisTable, { SolutionTableDataRow } from "./BasisTable";
import LogViewer from "./LogViewer";

export const renderValue = (value: number) => {
  if (value === Infinity) {
    return "∞";
  } else if (value === -Infinity) {
    return "-∞";
  }

  return value;
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

const renderAlert = (
  solution: HighsSolution,
  startTime: number | undefined,
  endTime: number | undefined
) => {
  if (solution.Status === "Optimal") {
    return (
      <Alert severity="success" sx={{ pt: 2 }}>
        <AlertTitle>
          Optimaler Zielfunktionswert von {solution.ObjectiveValue}
        </AlertTitle>

        {/* Show the time it took to solve the problem */}
        {endTime && startTime && (
          <Typography variant="h3">
            {renderTimeDelta(endTime - startTime)}
          </Typography>
        )}
      </Alert>
    );
  } else {
    // TODO: Implement other cases for better user feedback
    return (
      <Alert severity="error" sx={{ pt: 2 }}>
        <AlertTitle>Keine optimale Lösung gefunden</AlertTitle>
        <Typography variant="h3">{solution.Status}</Typography>
      </Alert>
    );
  }
};

const renderinPaper = (children: React.ReactNode) => {
  return (
    <Paper sx={{ m: 3, p: 3 }}>
      <Typography variant="h5" sx={{ mb: 1 }}>
        Lösung
      </Typography>
      {children}
    </Paper>
  );
};

const rerenderInterval = (timeDelta: number) => {
  if (timeDelta < 60000) {
    // < 1min => 300ms - 500ms
    return 300 + Math.random() * 400;
  } else if (timeDelta <= 600000) {
    // <10min => 500ms - 1000ms
    return 500 + Math.random() * 500;
  } else {
    // >10min => 1000ms - 2000ms
    return 1000 + Math.random() * 1000;
  }
};

export default function SolutionContainer() {
  const inputType = useSelector((state: RootState) => state.inputType);
  const allSolveResults = useSelector((state: RootState) => state.solveResults);
  const result = allSolveResults[inputType];

  const [timeDelta, setTimeDelta] = React.useState<number>(0);

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
      timeDelta > new Date().getTime() - result.startTime
    ) {
      setTimeDelta(new Date().getTime() - result.startTime);
      return;
    }

    // Update time delta every rerenderInterval
    const interval = setInterval(() => {
      if (result.endTime === undefined && result.startTime !== undefined) {
        setTimeDelta(new Date().getTime() - result.startTime);
      }
    }, rerenderInterval(timeDelta));

    return () => {
      clearInterval(interval);
    };
  }, [result, timeDelta]);

  if (result.error !== undefined) {
    console.log("Solution Paper encountered an error", result.error);
    return renderinPaper(
      <Alert severity="error">
        <AlertTitle>Es ist ein Fehler aufgetreten</AlertTitle>
        <Typography>{result.error.message}</Typography>
      </Alert>
    );
  }

  if (result.solution === undefined) {
    // Show loading message
    if (result.startTime !== undefined) {
      return renderinPaper(
        <>
          <LinearProgress />
          <Alert severity="info">
            Berechnung läuft seit
            <Typography variant="h3">{renderTimeDelta(timeDelta)}</Typography>
          </Alert>
        </>
      );
    }

    // No solution available
    return <></>;
  } else {
    // prepare data for tables
    const constraintRows: SolutionTableDataRow[] = [];
    for (const constraint of Object.values(result.solution.Rows)) {
      constraintRows.push(constraint as unknown as SolutionTableDataRow);
    }
    const VariableColumns: SolutionTableDataRow[] = Object.values(
      result.solution.Columns
    );

    return renderinPaper(
      <>
        {renderAlert(result.solution, result.startTime, result.endTime)}

        <Box sx={{ my: 3 }}>
          {/* Show Decision Variables  */}
          <Accordion elevation={3} defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              Decision Variables
            </AccordionSummary>
            <AccordionDetails>
              <BasisTable dataRows={VariableColumns} />
            </AccordionDetails>
          </Accordion>

          {/* Show Constraints  */}
          <Accordion elevation={3}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              Constraints
            </AccordionSummary>
            <AccordionDetails>
              <BasisTable dataRows={constraintRows} />
            </AccordionDetails>
          </Accordion>

          {/* Logging View  */}
          <Tooltip title={result.log.length === 0 ? "No logs available" : ""}>
            <Accordion elevation={3} disabled={result.log.length === 0}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                Solver Logs
              </AccordionSummary>
              <AccordionDetails>
                <LogViewer logs={result.log} />
              </AccordionDetails>
            </Accordion>
          </Tooltip>
        </Box>
      </>
    );
  }
}
