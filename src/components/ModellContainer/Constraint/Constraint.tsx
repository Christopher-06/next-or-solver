"use client";
import NameInput from "@/components/Variable/NameInput";
import { Box, Button, Tooltip } from "@mui/material";
import FormularTextField from "../FormularTextField";
import MouseProvider from "@/components/MouseProvider/MouseProvider";
import ClearIcon from "@mui/icons-material/Clear";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  removeConstraint,
  setConstraintFormular,
  setConstraintName,
} from "@/store/slices/Modell";

export default function Constraint({
  constraintIndex,
  showDeleteButton = true,
}: {
  constraintIndex: number;
  showDeleteButton?: boolean;
}) {
  const constraint = useSelector(
    (state: RootState) => state.modell.constraints[constraintIndex]
  );
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

  return (
    <MouseProvider>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {/* Name Field */}
        <Box sx={{ display: "flex" }}>
          <NameInput name={constraint.name} setName={setNameDispatched} viewingSuffix=":"/>
        </Box>

        {/* Formular */}
        <FormularTextField
          text={constraint.formular}
          setText={setFormularDispatched}
          label="Formular"
        />

        {/* Show delete button */}
        {showDeleteButton && (
          <Tooltip title="Löschen">
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
    </MouseProvider>
  );
}
