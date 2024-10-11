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
import { Stack } from "@mui/material";
import MouseProvider from "../MouseProvider/MouseProvider";
import Constraint from "./Constraint/Constraint";
import Objective from "./Objective/Objective";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addConstraint } from "@/store/slices/Modell";

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
    <>
      {/* Objective Input */}
      <MouseProvider>
        <Objective />
      </MouseProvider>

      {/* Constraints */}
      <Stack spacing={5} sx={{ pt: 10 }} direction="column">
        {modell.constraints.map((_, index) => (
          <Constraint
            key={index}
            constraintIndex={index}
            showDeleteButton={index !== modell.constraints.length - 1}
          />
        ))}
      </Stack>
    </>
  );
}
