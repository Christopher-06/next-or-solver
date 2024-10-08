"use client";
import VariableComponent from "@/components/Variable/VariableComponent";
import { Stack } from "@mui/material";
import type { RootState } from "@/store/store";
import { useSelector, useDispatch } from "react-redux";
import { addVariable } from "@/store/slices/Variables";
import { useEffect } from "react";

export default function VariableContainer() {
  const variables = useSelector((state: RootState) => state.variables);
  const dispatch = useDispatch();

  // Have one empty variable at the bottom
  useEffect(() => {
    if (variables.length === 0 || variables[variables.length - 1].name !== "") {
      dispatch(addVariable());
    }
  }, [variables, dispatch]);

  return (
    <Stack spacing={5} direction="column">
      {variables.map((_, index) => (
        <VariableComponent
          key={index}
          var_idx={index}
          showDeleteButton={index !== variables.length - 1}
        />
      ))}
    </Stack>
  );
}
