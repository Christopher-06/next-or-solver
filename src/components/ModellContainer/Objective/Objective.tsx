"use client";
import { Grid2 } from "@mui/material";
import SenseSelector from "./SenseSelector";
import FormularTextField from "../FormularTextField";
import { Sense } from "@/lib/types/Modell";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setObjectiveFormular, setObjectiveSense } from "@/store/slices/Modell";

export default function Objective() {

  const dispatch = useDispatch();
  const modell_objective = useSelector((state : RootState) => state.modell.objective_formular);
  const modell_sense = useSelector((state : RootState) => state.modell.sense);

  const setSense = (sense: Sense) => {
    dispatch(setObjectiveSense(sense));  
  }
  const setObjective = (objective: string) => {
    dispatch(setObjectiveFormular(objective));
  }
  
  return (
    <Grid2 container spacing={2} alignItems="center">
      {/* Sense Selection */}
      <Grid2
        size={{ sm: 12, md: 2 }}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <SenseSelector sense={modell_sense} setSense={setSense} />
      </Grid2>

      {/* Objective Input */}
      <Grid2
        size={{ sm: 12, md: 10 }}
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <FormularTextField
          text={modell_objective}
          setText={setObjective}
          centered={false}
          label="Objective"
        />
      </Grid2>
    </Grid2>
  );
}
