import { setVariableValue } from "@/store/slices/Variables";
import { RootState } from "@/store/store";
import { Grid2, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OneDimension from "./OneDim/OneDimension";
import TwoDimension from "./TwoDim/TwoDimension";
import { useTranslations } from "next-intl";

export default function ArrayInput({ variable_id }: { variable_id: string }) {
  const variable = useSelector((state: RootState) =>
    state.variables.find((v) => v._id === variable_id)
  );
  const dispatch = useDispatch();
  const t = useTranslations();

  // enforce Array as data type
  useEffect(() => {
    if (!(variable?.dataValue instanceof Array)) {
      dispatch(setVariableValue({ _id: variable_id, value: [] }));
    }
  }, [variable, variable_id, dispatch]);

  // Enforce Array as data type and valid variable
  if (!variable || variable.dimensionType !== "ARRAY") {
    console.error(
      `Variable not found or not an array variable (idx: ${variable_id})`,
      variable
    );
    return <></>;
  }

  // wait for dataValue to be set correctly
  if (variable.dataValue === undefined) {
    return <></>;
  }

  if (variable.dimList.length === 0) {
    return (
      <Grid2 size={{ md: 12, lg: 12 }}>
        <Typography variant="h5" alignContent="center">
          {variable.name} = {"[]"}
        </Typography>
      </Grid2>
    );
  } else if (variable.dimList.length === 1) {
    return (
      <Grid2 size={{ md: 12, lg: 12 }}>
        <OneDimension variable={variable} />{" "}
      </Grid2>
    );
  } else if (variable.dimList.length === 2) {
    return (
      <Grid2 size={{ md: 12, lg: 12 }}>
        <TwoDimension variable={variable} />{" "}
      </Grid2>
    );
  } else {
    return (
      <Grid2 size={{ md: 12, lg: 12 }}>
        <Typography variant="h6">
          {variable.name} = {"[ " + variable.dimList.join(" x ") + " ]"} {t("data_input_container.array_input.max_2d_arrays")}
        </Typography>{" "}
      </Grid2>
    );
  }
}
