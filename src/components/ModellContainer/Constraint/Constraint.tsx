"use client";
import NameInput from "@/components/NameInput/NameInput";
import { Box, Button, Tooltip } from "@mui/material";
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
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "100%",
          flexWrap: "wrap",
        }}
      >
        {/* Name Field */}
        <Box sx={{ display: "flex", width: "120px" }}>
          <NameInput
            name={constraint.name}
            setName={setNameDispatched}
            viewingSuffix=":"
          />
        </Box>

        {/* Formular */}
        <FormularTextField
          text={constraint.formular}
          setText={setFormularDispatched}
          label="Formular"
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
          <Tooltip title="Löschen" sx={{ minWidth: "50px", mr: "auto" }}>
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
