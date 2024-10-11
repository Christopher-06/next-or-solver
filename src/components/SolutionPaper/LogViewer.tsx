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
import { Pair } from "@/lib/helper";

const VirtuosoTableComponents: TableComponents<Pair<string, number>> = {
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
      <TableCell sx={{ w: 1 }} colSpan={8}>
        Messages
      </TableCell>
    </TableRow>
  );
}

function rowContent(idx: number, item: Pair<string, number>) {
  const [msg, timeStamp] = item;

  return (
    <>
      <TableCell
        component="th"
        scope="row"
        align="right"
        sx={{ m: 0, py: 1, px: 2 }}
      >
        [#{idx + 1} - {new Date(timeStamp).toLocaleTimeString()}]
      </TableCell>
      <TableCell align="left" colSpan={8} sx={{ m: 0, p: 0 }}>
        {msg}
      </TableCell>
    </>
  );
}

export default function LogViewer({ logs }: { logs: Pair<string, number>[] }) {
  const height = 100 + Math.min(300, logs.length * 40);

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
