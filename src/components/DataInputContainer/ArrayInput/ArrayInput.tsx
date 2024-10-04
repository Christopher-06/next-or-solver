import { Variable } from "@/lib/types/Variable";
import { setVariableValue } from "@/store/slices/Variables";
import { RootState } from "@/store/store";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function TableCellGenerator(index_var: Variable | undefined) {
  if (index_var?.dataValue instanceof Set) {
    return Array.from(index_var.dataValue).map((name, idx) => (
      <TableCell key={idx}>{name}</TableCell>
    ));
  }

  return <></>;
}

function CreateRow(index_var: Variable | undefined, n_cols: number) {
  if (index_var?.dataValue instanceof Set) {
    const values = Array.from(index_var.dataValue);
    return values.map((val, idx) => (
      <TableRow
        key={"row" + idx}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {val}
        </TableCell>
        {Array.from({ length: n_cols }, (_, i) => i).map((_, idx) => (
          <TableCell key={"cell" + idx}></TableCell>
        ))}
      </TableRow>
    ));
  }
  return <></>;
}

export default function ArrayInput({ variable_id }: { variable_id: string }) {
  const all_variables = useSelector((state: RootState) => state.variables);
  const variable = all_variables.find(
    (variable) => variable._id === variable_id
  );
  const dispatch = useDispatch();

  // enforce Array as data type
  useEffect(() => {
    if (!(variable?.dataValue instanceof Array)) {
      dispatch(setVariableValue({ _id: variable_id, value: [] }));
    }
  }, [variable, variable_id, dispatch]);

  // Enforce Array as data type and valid variable
  if (!variable || variable.dimensionType !== "ARRAY") {
    console.error(
      `Variable not found or not an array variable (idx: ${variable_id})`,
      variable
    );
    return <></>;
  }

  if (variable.dataValue === undefined) {
    return <></>;
  }

  if (variable.dimList.length === 0) {
    return (
      <Typography variant="h5" alignContent="center">
        {variable.name} = {"[]"}
      </Typography>
    );
  }

  // Retrieve Col and Row index variables
  const col_index_var_name =
    variable.dimList.length > 0 ? variable.dimList[0] : undefined;
  const col_index_var = all_variables.find(
    (v) => v.name === col_index_var_name && v.dimensionType === "SET"
  );
  const row_index_var_name =
    variable.dimList.length >= 1 ? variable.dimList[1] : undefined;
  const row_index_var = all_variables.find(
    (v) => v.name === row_index_var_name && v.dimensionType === "SET"
  );

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              {variable.name}
              {" [" + variable.dimList.join(" x ") + "]"}
            </TableCell>
            {col_index_var && TableCellGenerator(col_index_var)}
          </TableRow>
        </TableHead>

        <TableBody>
          {row_index_var &&
            CreateRow(
              row_index_var,
              col_index_var?.dataValue instanceof Set
                ? Array.from(col_index_var.dataValue).length
                : 0
            )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
