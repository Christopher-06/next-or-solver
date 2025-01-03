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

"use client";
import { Variable } from "@/lib/types/Variable";
import { setVariableValue } from "@/store/slices/Variables";
import { RootState } from "@/store/store";
import { Box, styled, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import NumericInput from "../../NumericInput/NumericInput";
import { useTranslations } from "next-intl";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ItemsChipArray({ variable }: { variable: Variable }) {
  const dispatch = useDispatch();
  const t = useTranslations();

  const dataArray = variable.dataValue as (number | undefined)[];

  const col_index_name = variable.dimList[0];
  const col_index_var = useSelector((state: RootState) =>
    state.variables.find(
      (v) => v.name === col_index_name && v.dimensionType === "SET"
    )
  );
  const col_index_values = col_index_var?.dataValue
    ? (col_index_var.dataValue as string[])
    : [];

  const valueSetter = (index: number) => {
    return (value: number | undefined) => {
      const new_data = [...dataArray];

      // Correct the length of the array
      while (new_data.length <= index) {
        new_data.push(undefined);
      }
      while (new_data.length > col_index_values.length) {
        new_data.pop();
      }

      new_data[index] = value;
      dispatch(setVariableValue({ _id: variable._id, value: new_data }));
    };
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "space-evenly",
        flex: 1,
        alignContent: "space-evenly",
        justifyContent: "space-evenly",
        justifyItems: "space-evenly",
        flexWrap: "wrap",
        listStyle: "none",
        m: 0,
        p: 0,
      }}
      component="ul"
    >
      {/* Show no index value error message */}
      {col_index_values.length === 0 ? (
        <Typography variant="body1" color="error">
          {t("data_input_container.array_input.no_index_value").replace(
            "{index_name}",
            col_index_name
          )}
        </Typography>
      ) : null}

      {/* Build up the array input */}
      {col_index_values.map((col_name, idx) => {
        return (
          <ListItem key={variable._id + col_name}>
            <NumericInput
              value={idx < dataArray.length ? dataArray[idx] : undefined}
              label={col_name}
              valueType={variable.valueType}
              setValue={valueSetter(idx)}
            />
          </ListItem>
        );
      })}
    </Box>
  );
}
