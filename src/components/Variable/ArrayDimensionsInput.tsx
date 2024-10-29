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

/* eslint-disable react-hooks/exhaustive-deps */
import { useTranslations } from "next-intl"; //Sprache
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
  const t = useTranslations(); //Sprache

  const dispatch = useDispatch();
  const allVariables = useSelector((state: RootState) => state.variables);
  const variable = allVariables[var_idx];

  // validate form
  const okayDimIndices = allVariables
    .filter((v) => variable.dimList.includes(v.name))
    .map((v) => v.name);

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
        label={t("variable.arraydimension.label")} //Sprache
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
