import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { renderValue } from "./SolutionPaper";
import { VariableColumn } from "@/lib/types/Solution";

export default function VariableTable({
  VariableColumns,
}: {
  VariableColumns: VariableColumn[];
}) {
  return (
    <>
      {VariableColumns.map((col, index) => {
        return (
          <TableRow
            key={index}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {col.Name}
            </TableCell>
            <TableCell align="right">{renderValue(col.Upper)}</TableCell>
            <TableCell align="right">{renderValue(col.Lower)}</TableCell>
            <TableCell align="right">{col.Type}</TableCell>
            <TableCell align="right">{renderValue(col.Primal)}</TableCell>
            <TableCell align="right">{renderValue(col.Dual)}</TableCell>
          </TableRow>
        );
      })}
    </>
  );
}
