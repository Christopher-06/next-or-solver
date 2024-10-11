/* eslint-disable react/display-name */
import { Variable } from "@/lib/types/Variable";
import { RootState } from "@/store/store";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import NumericInput from "../../NumericInput/NumericInput";
import { setVariableValue } from "@/store/slices/Variables";
import { TableComponents, TableVirtuoso } from "react-virtuoso";

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

export default function TwoDimension({ variable }: { variable: Variable }) {
  const dispatch = useDispatch();

  const dataArray = variable.dataValue as (number | undefined)[];

  // Get column index variable
  const col_index_name = variable.dimList[0];
  const col_index_var = useSelector((state: RootState) =>
    state.variables.find(
      (v) => v.name === col_index_name && v.dimensionType === "SET"
    )
  );
  const col_index_values = col_index_var?.dataValue as string[];

  // Get row index variable
  const row_index_name = variable.dimList[1];
  const row_index_var = useSelector((state: RootState) =>
    state.variables.find(
      (v) => v.name === row_index_name && v.dimensionType === "SET"
    )
  );
  const row_index_values = row_index_var?.dataValue as string[];

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

  const fixedHeaderContent = () => {
    return (
      <TableRow>
        <TableCell align="center" sx={{ backgroundColor: "background.paper" }}>
          {variable.name}
        </TableCell>
        {col_index_values.map((col_name, col_idx) => (
          <TableCell
            align="center"
            sx={{ backgroundColor: "background.paper" }}
            key={col_idx}
          >
            {col_name}
          </TableCell>
        ))}
      </TableRow>
    );
  };

  const rowContent = (row_idx: number, row_name: string) => {
    return (
      <>
        <TableCell>{row_name}</TableCell>
        {col_index_values.map((_, col_idx) => {
          const data_idx = row_idx * col_index_values.length + col_idx;

          return (
            <TableCell key={col_idx} sx={{ minWidth: "150px" }} align="center">
              <NumericInput
                label=""
                showHelperTextInTooltip={true}
                showHelperText={false}
                value={
                  data_idx < dataArray.length ? dataArray[data_idx] : undefined
                }
                valueType={variable.valueType}
                setValue={valueSetter(data_idx)}
              />
            </TableCell>
          );
        })}
      </>
    );
  };

  const rows = row_index_values;
  const height = 60 + Math.min(300, rows.length * 73);

  return (
    <Paper sx={{ height, minWidth: "800px" }}>
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}
