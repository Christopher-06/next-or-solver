"use client"
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
      if (variable?.dataValue instanceof Set) {
        const newSet = new Set(variable.dataValue);
        newSet.delete(value);

        dispatch(setVariableValue({ _id: variable._id, value: newSet }));
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
