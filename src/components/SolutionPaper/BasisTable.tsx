/* eslint-disable react/display-name */
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso, TableComponents } from "react-virtuoso";
import { renderValue } from "./SolutionPaper";

export type SolutionTableDataRow = {
  Name: string;
  Upper: number;
  Lower: number;
  Type: string;
  Primal: number;
  Dual: number;
}
const VirtuosoTableComponents: TableComponents<SolutionTableDataRow> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}  
      sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
    />
  ),
  TableHead: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableHead {...props} ref={ref} />
  )),
  TableRow,
  TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

function fixedHeaderContent() {
  return (
    <TableRow sx={{ backgroundColor: "background.paper" }}>
      <TableCell
       >Name</TableCell>
      <TableCell align="center">Upper</TableCell>
      <TableCell align="center">Lower</TableCell>
      <TableCell align="center">Type</TableCell>
      <TableCell align="center">Primal</TableCell>
      <TableCell align="center">Dual</TableCell>
    </TableRow>
  );
}

function rowContent(_index: number, row: SolutionTableDataRow) {
    console.log(row)
  return (
    <>
      <TableCell component="th" scope="row">
       {row.Name}
      </TableCell>
      <TableCell align="center">{renderValue(row.Upper)}</TableCell>
      <TableCell align="center">{renderValue(row.Lower)}</TableCell>
      <TableCell align="center">{row.Type}</TableCell>
      <TableCell align="center">{renderValue(row.Primal)}</TableCell>
      <TableCell align="center">{renderValue(row.Dual)}</TableCell>
    </>
  );
}

export default function BasisTable({
  dataRows,
}: {
  dataRows: SolutionTableDataRow[];
}) {

    const height = 60 + Math.min(300, dataRows.length * 55);

  return (
    <Paper sx={{ height, w : 1 }}>
      <TableVirtuoso
        data={dataRows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}
