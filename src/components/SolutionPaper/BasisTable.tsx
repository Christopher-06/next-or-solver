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
import { renderValue } from "./SolutionPaper";
import { useTranslations } from "next-intl";

export type SolutionTableDataRow = {
  Name: string;
  Upper: number;
  Lower: number;
  Type: string;
  Primal: number;
  Dual: number;
};
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



function rowContent(_index: number, row: SolutionTableDataRow) {
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
  const t = useTranslations();
  const height = 60 + Math.min(300, dataRows.length * 55);

  function fixedHeaderContent() {
    return (
      <TableRow sx={{ backgroundColor: "background.paper" }}>
        <TableCell>{t("solution_paper.basis_table.name")}</TableCell>
        <TableCell align="center">{t("solution_paper.basis_table.upper")}</TableCell>
        <TableCell align="center">{t("solution_paper.basis_table.lower")}</TableCell>
        <TableCell align="center">{t("solution_paper.basis_table.type")}</TableCell>
        <TableCell align="center">{t("solution_paper.basis_table.primal")}</TableCell>
        <TableCell align="center">{t("solution_paper.basis_table.dual")}</TableCell>
      </TableRow>
    );
  }

  return (
    <Paper sx={{ height, w: 1 }}>
      <TableVirtuoso
        data={dataRows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}
