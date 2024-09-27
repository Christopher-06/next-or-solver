"use client";
import { Grid2 } from "@mui/material";
import SenseSelector, { Sense } from "./SenseSelector";
import { useState } from "react";
import FormularTextField from "../FormularTextField";

export default function Objective() {
  const [sense, setSense] = useState<Sense>("MAX");

  const [objective, setObjective] = useState<string>("");
  return (
    <Grid2 container spacing={2} alignItems="center">
      {/* Sense Selection */}
      <Grid2
        size={{ sm: 12, md: 2 }}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <SenseSelector sense={sense} setSense={setSense} />
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
          text={objective}
          setText={setObjective}
          centered={false}
          label="Objective"
        />
      </Grid2>
    </Grid2>
  );
}
