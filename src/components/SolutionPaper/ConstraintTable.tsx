import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { renderValue } from "./SolutionPaper";
import { ConstraintRow } from "@/lib/types/Solution";

export default function ConstraintTable({
  constraintsRows,
}: {
  constraintsRows: ConstraintRow[];
}) {
  return (
    <>
      {constraintsRows.map((row, index) => {
        return (
          <TableRow
            key={index}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.Name}
            </TableCell>
            <TableCell align="right">{renderValue(row.Upper)}</TableCell>
            <TableCell align="right">{renderValue(row.Lower)}</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right">{renderValue(row.Primal)}</TableCell>
            <TableCell align="right">{renderValue(row.Dual)}</TableCell>
          </TableRow>
        );
      })}
    </>
  );
}
