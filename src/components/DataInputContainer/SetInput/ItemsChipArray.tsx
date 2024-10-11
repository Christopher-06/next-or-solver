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
import { Box, Chip, styled, Typography } from "@mui/material";
import { useDispatch } from "react-redux";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ItemsChipArray({
  entries,
  variable,
}: {
  entries: string[];
  variable: Variable;
}) {
  const dispatch = useDispatch();

  const onClickDelete = (value: string) => {
    return () => {
      if (Array.isArray(variable?.dataValue)) {
        dispatch(
          setVariableValue({
            _id: variable._id,
            value: variable.dataValue
              .filter((k) => k !== value)
              .map((k) => k as string),
          })
        );
      }
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
      {entries.length > 0 ? (
        entries.map((item) => {
          return (
            <ListItem key={variable._id + item}>
              <Chip label={item} onDelete={onClickDelete(item)} />
            </ListItem>
          );
        })
      ) : (
        <Typography color="error" variant="h5">
          ∅
        </Typography>
      )}
    </Box>
  );
}
