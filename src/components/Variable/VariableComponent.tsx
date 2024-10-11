"use client";
import {
  Button,
  Grid2,
  Theme,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MouseProvider from "../MouseProvider/MouseProvider";
import BoundInput from "./BoundInput";
import ClearIcon from "@mui/icons-material/Clear";
import ValueTypeSelector from "./ValueTypeSelector";
import PropertySelector from "./PropertySelector";
import DimensionsSelector from "./DimensionsSelector";
import ArrayDimensionsInput from "./ArrayDimensionsInput";
import {
  VarDimensionType,
  Variable,
  VarPropertyType,
  VarValueType,
} from "@/lib/types/Variable";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  setValueType,
  setDimensionType,
  setLowerBound,
  setPropertyType,
  setUpperBound,
  removeVariable,
} from "@/store/slices/Variables";
import VariableName from "./VarName";
import { EasyUIVariableDeclarationError } from "@/lib/easy-ui/validation";
import { ConvertError } from "@/lib/easy-ui/converter";

export default function VariableComponent({
  var_idx,

  showDeleteButton = true,
}: {
  var_idx: number;
  showDeleteButton?: boolean;
}) {
  const isSM = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  const dispatch = useDispatch();
  const variable: Variable = useSelector(
    (state: RootState) => state.variables[var_idx]
  );
  const variableError = useSelector((state: RootState) => {
    // GMPL Validate Errors
    const errGMPL = state.textFieldInputs.EASY_UI.currentError;
    if (errGMPL instanceof EasyUIVariableDeclarationError) {
      if (errGMPL.message.indexOf(variable.name) !== -1) {
        return errGMPL;
      }
    }

    // Convert Erros
    const errConvert = state.textFieldInputs.EASY_UI.currentError;
    if (errConvert instanceof ConvertError) {
      if (errConvert.variable.name === variable.name) {
        return errConvert;
      }
    }

    return null;
  });

  const {
    name,
    lowerBound,
    upperBound,
    valueType,
    propertyType,
    dimensionType,
  } = variable;

  const setLowerBoundDispatched = (lowerBound: number | undefined) => {
    dispatch(setLowerBound({ index: var_idx, lowerBound }));
  };

  const setUpperBoundDispatched = (upperBound: number | undefined) => {
    dispatch(setUpperBound({ index: var_idx, upperBound }));
  };

  const setValueTypeDispatched = (valueType: VarValueType) => {
    dispatch(setValueType({ index: var_idx, valueType }));
  };

  const setPropertyTypeDispatched = (propertyType: VarPropertyType) => {
    dispatch(setPropertyType({ index: var_idx, propertyType }));
  };

  const setDimensionTypeDispatched = (dimensionType: VarDimensionType) => {
    dispatch(setDimensionType({ index: var_idx, dimensionType }));
  };

  const removeVariableDispatched = () => {
    dispatch(removeVariable(var_idx));
  };

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
            setPropertyType={setPropertyTypeDispatched}
            keepTextFields={name === ""}
          />

          <DimensionsSelector
            dimensionType={dimensionType}
            setDimensionType={setDimensionTypeDispatched}
            keepTextFields={name === ""}
            allowSet={propertyType === "PARAMETER"}
          />
        </Grid2>

        {/* Choose lower bound (not with SET) */}
        <Grid2
          size={{ sm: 3, md: 1 }}
          sx={{ display: "flex", justifyContent: "end" }}
        >
          {propertyType === "DECISION" && (
            <BoundInput
              bound={lowerBound}
              setBound={setLowerBoundDispatched}
              type="LB"
              keepTextFields={name === ""}
            />
          )}
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
          {dimensionType === "SKALAR" || dimensionType === "SET" ? (
            <VariableName var_idx={var_idx} />
          ) : (
            <ArrayDimensionsInput var_idx={var_idx} />
          )}
        </Grid2>

        {/* Choose Upper Bound (not with SET) */}
        <Grid2 size={{ sm: 3, md: 1 }} sx={{ display: "flex" }}>
          {propertyType === "DECISION" && (
            <BoundInput
              bound={upperBound}
              setBound={setUpperBoundDispatched}
              type="UB"
              keepTextFields={name === ""}
            />
          )}
        </Grid2>

        {/* Choose Value Type (not with SET) */}
        <Grid2
          size={{ sm: 4, md: 2 }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {dimensionType !== "SET" && (
            <>
              <Typography variant="h4" sx={{ mx: 2 }}>
                &isin;{" "}
              </Typography>
              <ValueTypeSelector
                valueType={valueType}
                setValueType={setValueTypeDispatched}
                keepTextFields={name === ""}
              />
            </>
          )}
        </Grid2>

        {/* Space between the value type and the delete button (only SM in next row) */}
        {isSM && <Grid2 size={{ xs: 0, sm: 7, md: 0 }}></Grid2>}

        {/* Delete Button */}
        <Grid2
          size={{ sm: 1, md: 1 }}
          sx={{ display: "flex", alignItems: "center" }}
        >
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
        </Grid2>

        {/* Error Viewer */}
        <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
          {variableError && (
            <Typography variant="body2" color="error">
              {variableError.message}
            </Typography>
          )}
        </Grid2>
      </Grid2>
    </MouseProvider>
  );
}
