"use client";
import { Stack } from "@mui/material";
import MouseProvider from "../MouseProvider/MouseProvider";
import Constraint from "./Constraint/Constraint";
import Objective from "./Objective/Objective";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addConstraint } from "@/store/slices/Modell";
import MathJax from "react-mathjax2";

export default function ModellContainer() {
  const modell = useSelector((state: RootState) => state.modell);
  const dispatch = useDispatch();

  // Have one empty variable at the bottom
  useEffect(() => {
    if (
      modell.constraints.length === 0 ||
      modell.constraints[modell.constraints.length - 1].formular !== ""
    ) {
      dispatch(addConstraint());
    }
  }, [modell, dispatch]);

  return (
    <MathJax.Context input="tex">
      <>
        {/* Objective Input */}
        <MouseProvider>
          <Objective />
        </MouseProvider>

        {/* Constraints */}
        <Stack spacing={1} sx={{ pt: 2 }} direction="column">
          {modell.constraints.map((_, index) => (
            <Constraint
              key={index}
              constraintIndex={index}
              showDeleteButton={index !== modell.constraints.length - 1}
            />
          ))}
        </Stack>
      </>
    </MathJax.Context>
  );
}
