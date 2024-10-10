"use client";
import { Variable } from "@/lib/types/Variable";
import { setVariableValue } from "@/store/slices/Variables";
import { RootState } from "@/store/store";
import { Box, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import NumericInput from "../../NumericInput/NumericInput";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ItemsChipArray({ variable }: { variable: Variable }) {
  const dispatch = useDispatch();

  const dataArray = variable.dataValue as (number | undefined)[];

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
