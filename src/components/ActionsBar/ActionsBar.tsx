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
import { useTranslations } from "next-intl";
import { Button, Grid2, Stack } from "@mui/material";
import React from "react";
import { clearSolution } from "@/store/slices/SolveResults";
import { useDispatch, useSelector } from "react-redux";
import { clearAllVariables } from "@/store/slices/Variables";
import { RootState } from "@/store/store";
import ExportButton from "../Editor/ExportButton";
import { FileFormat } from "../Converter/FileFormat";
import { InputType } from "@/store/slices/InputType";
import { setTextFieldValue } from "@/store/slices/TextFieldInputs";
import { clearAllModell } from "@/store/slices/Modell";
import { Modell } from "@/lib/types/Modell";
import { Variable } from "@/lib/types/Variable";
import SolveAction from "./SolveAction";

export const FILEFORMAT_MAP: { [key in InputType]: FileFormat } = {
  GMPL: FileFormat.GMPL,
  CPLEX_LP: FileFormat.CPLEX_LP,
  MPS: FileFormat.MPS,
  EASY_UI: FileFormat.EASY_UI,
};

export default function ActionsBar() {
  const t = useTranslations();
  const dispatch = useDispatch();
  const inputType = useSelector((state: RootState) => state.inputType);
  const textFieldInputs = useSelector(
    (state: RootState) => state.textFieldInputs
  );
  const textFieldValue = textFieldInputs[inputType].textFieldValue;
  const currentFormat = FILEFORMAT_MAP[inputType];
  const easyUiModell: Modell = useSelector((state: RootState) => state.modell);
  const easyUiVariables: Variable[] = useSelector(
    (state: RootState) => state.variables
  );

  const handleDeleteAllClick = () => {
    dispatch(clearSolution(inputType));

    if (inputType == "EASY_UI") {
      dispatch(clearAllVariables());
      dispatch(clearAllModell());
    } else {
      dispatch(
        setTextFieldValue({
          key: inputType,
          value: "",
        })
      );
    }
  };

  return (
    <>
      <Grid2 container sx={{ px: 3 }} spacing={2}>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Stack direction="row" spacing={2} justifyContent="start">
            <ExportButton
              content={textFieldValue}
              easyUiModell={easyUiModell}
              easyUiVariables={easyUiVariables}
              currentFormat={currentFormat}
              targetFormat={FileFormat.GMPL}
            />
            <ExportButton
              content={textFieldValue}
              easyUiModell={easyUiModell}
              easyUiVariables={easyUiVariables}
              currentFormat={currentFormat}
              targetFormat={FileFormat.CPLEX_LP}
            />
            <ExportButton
              content={textFieldValue}
              easyUiModell={easyUiModell}
              easyUiVariables={easyUiVariables}
              currentFormat={currentFormat}
              targetFormat={FileFormat.MPS}
            />
          </Stack>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }} sx={{ justifyContent: "center" }}>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="end"
            alignItems="center"
          >
            <Button
              variant="contained"
              color="warning"
              onClick={handleDeleteAllClick}
            >
              {t("actions_bar.actions_bar.btn_delete_all")}
            </Button>

            <SolveAction />
          </Stack>
        </Grid2>
      </Grid2>
    </>
  );
}
