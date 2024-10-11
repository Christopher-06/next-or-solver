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
import NameInput from "@/components/NameInput/NameInput";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import FormularTextField from "../FormularTextField";
import MouseProvider from "@/components/MouseProvider/MouseProvider";
import ClearIcon from "@mui/icons-material/Clear";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  removeConstraint,
  setConstraintForAll,
  setConstraintFormular,
  setConstraintName,
} from "@/store/slices/Modell";
import ForAllView from "./ForAllView";
import { EasyUIConstraintError } from "@/lib/easy-ui/validation";

export default function Constraint({
  constraintIndex,
  showDeleteButton = true,
}: {
  constraintIndex: number;
  showDeleteButton?: boolean;
}) {
  const t = useTranslations();
  const constraint = useSelector(
    (state: RootState) => state.modell.constraints[constraintIndex]
  );
  const constraintError = useSelector((state: RootState) => {
    const solutionError = state.textFieldInputs.EASY_UI.currentError;
    if (solutionError instanceof EasyUIConstraintError) {
      if (solutionError.constraint._id == constraint._id) {
        return solutionError;
      }
    }
    return null;
  });
  const dispatch = useDispatch();

  const setNameDispatched = (name: string) => {
    dispatch(setConstraintName({ index: constraintIndex, name }));
  };

  const setFormularDispatched = (formular: string) => {
    dispatch(setConstraintFormular({ index: constraintIndex, formular }));
  };

  const removeVariableDispatched = () => {
    dispatch(removeConstraint(constraintIndex));
  };

  const constraintErrorMessage =
    constraintError?.message.split(":")[
      constraintError?.message.split(":").length - 1
    ];

  return (
    <MouseProvider>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "100%",
          flexWrap: "wrap",
          minHeight : "100px"
        }}
      >
        {/* Name Field */}
        <Box sx={{ display: "flex", width: "190px" }}>
          <NameInput
            name={constraint.name}
            setName={setNameDispatched}
            viewingSuffix=":"
            viewingPrefix={<>{constraintIndex == 0 ? "s.t." : <>&nbsp;&nbsp;&nbsp;&nbsp;</>} &nbsp;&nbsp;&nbsp;</>}
          />
        </Box>

        {/* Formular */}
        <FormularTextField
          text={constraint.formular}
          setText={setFormularDispatched}
          error={constraintError != null}
          label={t("modell_container.constraint.Formular_label")}
        />

        {/* For All View */}
        <ForAllView
          forAll={constraint.for_all}
          SetForAll={(forAll) => {
            dispatch(
              setConstraintForAll({ index: constraintIndex, value: forAll })
            );
          }}
        />

        {/* Show delete button */}
        {showDeleteButton && (
          <Tooltip
            title={t("modell_container.constraint.delete_btn")}
            sx={{ minWidth: "50px", mr: "auto" }}
          >
            <Button
              variant="contained"
              color="error"
              sx={{ m: 1 }}
              onClick={removeVariableDispatched}
            >
              <ClearIcon fontSize="small" />
            </Button>
          </Tooltip>
        )}
      </Box>

      {constraintError && (
        <Typography color="error" variant="caption" textAlign="center">
          {constraintErrorMessage}
        </Typography>
      )}
    </MouseProvider>
  );
}
