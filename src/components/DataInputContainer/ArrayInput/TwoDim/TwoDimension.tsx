import { Variable } from "@/lib/types/Variable";
import { RootState } from "@/store/store";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NumericInput from "../../NumericInput/NumericInput";
import { setVariableValue } from "@/store/slices/Variables";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownIcon from "@mui/icons-material/ArrowDownward";

export default function TwoDimension({ variable }: { variable: Variable }) {
  const dispatch = useDispatch();

  const [collapsed, setCollapsed] = useState(false);
  const dataArray = variable.dataValue as (number | undefined)[];

  // Get column index variable
  const col_index_name = variable.dimList[0];
  const col_index_var = useSelector((state: RootState) =>
    state.variables.find(
      (v) => v.name === col_index_name && v.dimensionType === "SET"
    )
  );
  const col_index_values =
    col_index_var?.dataValue instanceof Set
      ? Array.from(col_index_var?.dataValue)
      : [];

  // Get row index variable
  const row_index_name = variable.dimList[1];
  const row_index_var = useSelector((state: RootState) =>
    state.variables.find(
      (v) => v.name === row_index_name && v.dimensionType === "SET"
    )
  );
  const row_index_values =
    row_index_var?.dataValue instanceof Set
      ? Array.from(row_index_var?.dataValue)
      : [];

  const DATA_ARRAY_LENGTH = col_index_values.length * row_index_values.length;

  const valueSetter = (index: number) => {
    return (value: number | undefined) => {
      const new_data = [...dataArray];

      // Correct the length of the array

      while (new_data.length <= DATA_ARRAY_LENGTH) {
        new_data.push(undefined);
      }
      while (new_data.length > DATA_ARRAY_LENGTH) {
        new_data.pop();
      }

      new_data[index] = value;
      dispatch(setVariableValue({ _id: variable._id, value: new_data }));
    };
  };

  return (
    <TableContainer sx={{ maxHeight: collapsed ? "25vh" : "75vh" }}>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setCollapsed(!collapsed);
                }}
              >
                {collapsed ? (
                  <ArrowDownIcon sx={{ mr: 1 }} />
                ) : (
                  <ArrowUpwardIcon sx={{ mr: 1 }} />
                )}
                {variable.name}
              </Button>
            </TableCell>
            {col_index_values.map((col_name, col_idx) => (
              <TableCell key={col_idx}>{col_name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {
            row_index_values.map((row_name, row_idx) => (
              <TableRow key={row_idx}>
                <TableCell>{row_name}</TableCell>
                {col_index_values.map((_, col_idx) => {
                  const data_idx = row_idx * col_index_values.length + col_idx;

                  return (
                    <TableCell key={col_idx} sx={{ minWidth: "150px" }}>
                      <NumericInput
                        label=""
                        showHelperTextInTooltip={true}
                        showHelperText={false}
                        value={
                          dataArray.length < data_idx
                            ? dataArray[data_idx]
                            : undefined
                        }
                        valueType={variable.valueType}
                        setValue={valueSetter(data_idx)}
                      />
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
