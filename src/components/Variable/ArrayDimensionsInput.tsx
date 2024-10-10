/* eslint-disable react-hooks/exhaustive-deps */
import NameInput from "../NameInput/NameInput";
import { Typography } from "@mui/material";
import { useMouseContext } from "../MouseProvider/MouseProvider";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setDimList } from "@/store/slices/Variables";
import VariableName from "./VarName";

export default function ArrayDimensionsInput({ var_idx }: { var_idx: number }) {
  const { isInside } = useMouseContext();

  const dispatch = useDispatch();
  const variable = useSelector((state: RootState) => state.variables[var_idx]);

  // validate form
  const okayDimIndices = useSelector((state: RootState) =>
    state.variables
      .filter((v) => variable.dimList.includes(v.name))
      .map((v) => v.name)
  );
  const badDimIndices = variable.dimList.filter(
    (d) => !okayDimIndices.includes(d)
  );
  const helperText =
    badDimIndices.length > 0
      ? "Invalid dimensions: " + badDimIndices.join(", ")
      : "";

  // Update TextField when dimList changes
  const [tempDimInput, setTempDimInput] = useState(variable.dimList.join(", "));

  let dimInput = <></>;

  if (variable.name !== "" && !isInside) {
    // Draw as Math Text
    dimInput = (
      <>
        <Typography variant="h4" sx={{ ml: 1 }} color="textDisabled">
          [&nbsp;
        </Typography>

        <Typography
          variant="h5"
          color={helperText === "" ? "textPrimary" : "error"}
        >
          {variable.dimList.join(", ")}
        </Typography>

        <Typography variant="h4" color="textDisabled">
          &nbsp;]
        </Typography>
      </>
    );
  } else {
    // Draw as Text Field Input
    dimInput = (
      <NameInput
        name={tempDimInput}
        label="Dimensions"
        setName={(dimList: string) => {
          setTempDimInput(dimList);

          const newDimList = dimList
            .split(",")
            .map((d) => d.trim())
            .filter((d) => d !== "");
          dispatch(setDimList({ index: var_idx, dimList: newDimList }));
        }}
        errorText={helperText}
      />
    );
  }

  return (
    <>
      <VariableName var_idx={var_idx} />

      {dimInput}
    </>
  );
}
