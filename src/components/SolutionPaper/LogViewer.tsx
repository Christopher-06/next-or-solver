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
import { Pair } from "@/lib/helper";
import { Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";


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

function logItemToString([msg, timestamp]: Pair<string, number>, idx: number) {
  const timeStampString = new Date(timestamp).toLocaleTimeString();
  return `[#${idx + 1} - ${timeStampString}] \t ${msg}`;
}

export default function LogViewer({
  logs,
  exportFileNamePrefix,
}: {
  logs: Pair<string, number>[];
  exportFileNamePrefix: string;
}) {
  const height = 100 + Math.min(300, logs.length * 40);

  const onClickExport = () => {
    // Create Export File
    const currentTime = new Date().toLocaleTimeString();
    const exportFileName = exportFileNamePrefix + " " + currentTime + ".txt";
    const exportContent = logs.map(logItemToString).join("\n");

    // Download
    const blob = new Blob([exportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = exportFileName;
    link.click();

    URL.revokeObjectURL(url);
  };

  const fixedHeaderContent = () => {
    return (
      <TableRow sx={{ backgroundColor: "background.paper" }}>
        <TableCell></TableCell>
        <TableCell sx={{ w: 1 }} colSpan={8}>
          Messages
          {/* Export Button at the top right corner */}
          <Button
            variant="contained"
            size="small"
            style={{ float: "right" }}
            onClick={onClickExport}
          >
            <FileDownloadIcon sx={{ mr: 1 }} />
            Export
          </Button>
        </TableCell>
      </TableRow>
    );
  };

  const rowContent = (idx: number, item: Pair<string, number>) => {
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
  };

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
