"use client";
import NameInput from "@/components/Variable/NameInput";
import { Button, Grid2, Tooltip } from "@mui/material";
import FormularTextField from "../FormularTextField";
import MouseProvider from "@/components/MouseProvider/MouseProvider";
import ClearIcon from "@mui/icons-material/Clear";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { removeConstraint, setConstraintFormular, setConstraintName } from "@/store/slices/Modell";

const centeredFlex = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default function Constraint({
  constraintIndex,
  showDeleteButton = true,
}: {
  constraintIndex: number;
  showDeleteButton?: boolean;
}) {
  const constraint = useSelector((state: RootState) => state.modell.constraints[constraintIndex]);
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

  const deleteButton = showDeleteButton && (
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
  );

  return (
    <MouseProvider>
      <Grid2 container>
        {/* Name Input */}
        <Grid2
          size={{ sm: 10, lg: 2 }}
          sx={{
            ...centeredFlex,
          }}
        >
          <NameInput name={constraint.name} setName={setNameDispatched} />
        </Grid2>

        {/* Formular */}
        <Grid2
          size={{ sm: 12, lg: 9 }}
          sx={{
            ...centeredFlex,
          }}
        >
          <FormularTextField
            text={constraint.formular}
            setText={setFormularDispatched}
            label="Formular"
          />
        </Grid2>

       <Grid2
          size={{ sm : 0, md : 0, lg: 1 }}
          sx={{
            ...centeredFlex,
          }}
        >
          {deleteButton}
          </Grid2>
      </Grid2>
    </MouseProvider>
  );
}
