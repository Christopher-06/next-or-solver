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

const VirtuosoTableComponents: TableComponents<string> = {
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
      <TableCell></TableCell>
      <TableCell sx={{ w: 1 }} colSpan={10}>
        Messages
      </TableCell>
    </TableRow>
  );
}

function rowContent(idx: number, msg: string) {
  return (
    <>
      <TableCell component="th" scope="row" align="center">
        [#{idx + 1}]
      </TableCell>
      <TableCell align="left" colSpan={10}>
        {msg}
      </TableCell>
    </>
  );
}

export default function LogViewer({ logs }: { logs: string[] }) {
  const height = 100 + Math.min(300, logs.length * 55);

  return (
    <Paper sx={{ height, w: 1 }}>
      <TableVirtuoso
        data={logs}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}
