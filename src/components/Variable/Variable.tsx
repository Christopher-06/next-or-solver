"use client";
import {
  Button,
  Grid2,
  Theme,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import MouseProvider from "../MouseProvider/MouseProvider";
import NameInput from "./NameInput";
import BoundInput from "./BoundInput";
import ClearIcon from "@mui/icons-material/Clear";
import ValueTypeSelector, { VarValueType } from "./ValueTypeSelector";
import PropertySelector, { VarPropertyType } from "./PropertySelector";
import DimensionsSelector, { VarDimensionType } from "./DimensionsSelector";
import ArrayDimensionsInput from "./ArrayDimensionsInput";

export default function Variable() {
  const isSM = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  const [name, setName] = useState<string>("");
  const [lowerBound, setLowerBound] = useState<string>("");
  const [upperBound, setUpperBound] = useState<string>("");
  const [dataType, setDataType] = useState<VarValueType>("CONTINUOUS");
  const [propertyType, setPropertyType] = useState<VarPropertyType>("DECISION");
  const [dimensionType, setDimensionType] =
    useState<VarDimensionType>("SKALAR");
  const [dimList, setDimList] = useState<string[]>([]);

  return (
    <MouseProvider>
      <Grid2 container spacing={1}>
        {/* choose variable property and dimension type */}
        <Grid2
          size={{ sm: 12, md: 3 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PropertySelector
            propertyType={propertyType}
            setPropertyType={setPropertyType}
            keepTextFields={name === ""}
          />

          <DimensionsSelector
            dimensionType={dimensionType}
            setDimensionType={setDimensionType}
            keepTextFields={name === ""}
          />
        </Grid2>

        {/* Choose lower bound */}
        <Grid2
          size={{ sm: 3, md: 1 }}
          sx={{ display: "flex", justifyContent: "end" }}
        >
          <BoundInput
            bound={lowerBound}
            setBound={setLowerBound}
            type="LB"
            keepTextFields={name === ""}
          />
        </Grid2>

        {/* Choose Var Name + (optional) Array Dimensions */}
        <Grid2
          size={{ sm: 6, md: 4 }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {dimensionType === "SKALAR" ? (
            <NameInput name={name} setName={setName} />
          ) : (
            <ArrayDimensionsInput
              name={name}
              setName={setName}
              dimList={dimList}
              setDimList={setDimList}
            />
          )}
        </Grid2>

        {/* Choose Upper Bound */}
        <Grid2 size={{ sm: 3, md: 1 }} sx={{ display: "flex" }}>
          <BoundInput
            bound={upperBound}
            setBound={setUpperBound}
            type="UB"
            keepTextFields={name === ""}
          />
        </Grid2>

        {/* Choose Value Type */}
        <Grid2
          size={{ sm: 4, md: 2 }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" sx={{ mx: 2 }}>
            &isin;{" "}
          </Typography>
          <ValueTypeSelector
            valueType={dataType}
            setValueType={setDataType}
            keepTextFields={name === ""}
          />
        </Grid2>

        {/* Space between the value type and the delete button (only SM in next row) */}
        {isSM && <Grid2 size={{ xs: 0, sm: 7, md: 0 }}></Grid2>}

        {/* Delete Button */}
        <Grid2
          size={{ sm: 1, md: 1 }}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Tooltip title="Löschen">
            <Button variant="contained" color="error" sx={{ m: 1 }}>
              <ClearIcon fontSize="small" />
            </Button>
          </Tooltip>
        </Grid2>
      </Grid2>
    </MouseProvider>
  );
}
