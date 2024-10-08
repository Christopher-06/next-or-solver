"use client";
import { useTranslations } from "next-intl";
import { Grid2, TextField } from "@mui/material";
import SenseSelector, { Sense } from "./SenseSelector";
import { useState } from "react";
import MouseProvider from "../MouseProvider/MouseProvider";

export default function ModellContainer() {
  const [sense, setSense] = useState<Sense>("MAX");
  const t = useTranslations();

  return (
    <MouseProvider>
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
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField fullWidth label={t("modell_container.modell_container.label")} variant="outlined" />
        </Grid2>
      </Grid2>

      {/* TODO: Constraints */}
    </MouseProvider>
  );
}
