import { Modell } from "../types/Modell";
import { Variable } from "../types/Variable";
import CreateAllConstraint from "./constraints";
import {
  decisionArrayVariableDefinitions,
  decisionSkalarVariableDefinitions,
  parameterArrayVariableDefinitions,
  parameterSetVariableDefinitions,
  parameterSkalarVariableDefinitions,
} from "./variables";
import { createUniqueID } from "../helper";
import { validateEasyUI } from "./validation";

export type ConvertErrorName =
  | "NO_DIMENSION"
  | "TOO_MANY_DIMENSIONS"
  | "INVALID_DIMENSION"
  | "INVALID_VALUE_TYPE"
  | "NO_DATA_IN_ARRAY";

export class ConvertError extends Error {
  variable: Variable;

  constructor(message: ConvertErrorName, variable: Variable) {
    super(message);
    this.variable = variable;
  }
}

function createObjective(modell: Modell, variables: Variable[]) {
  const sense = modell.sense === "MAX" ? "maximize" : "minimize";

  // look for a name that is not already used to name the objective function
  const OBJECTIVE_FUNC_NAMES = [
    "z",
    "Z",
    "f",
    "F",
    "obj",
    "OBJ",
    "objective",
    "OBJECTIVE",
  ];
  const possible_func_name = OBJECTIVE_FUNC_NAMES.find(
    (name) =>
      !modell.constraints.some((constraint) => constraint.name === name) &&
      !variables.some((variable) => variable.name === name)
  );
  const object_func_name = possible_func_name || "obj-" + createUniqueID();

  // build up the objective statement
  return (
    sense + " " + object_func_name + ": " + modell.objective_formular + ";"
  );
}

export function getStatements(modell: Modell, variables: Variable[]) {
  // Create all var ... and param ... and set ... definitions
  const params_sets_defines = [
    ...parameterSetVariableDefinitions(variables),
    // decision variables
    ...decisionSkalarVariableDefinitions(variables),
    ...decisionArrayVariableDefinitions(variables),
    // other parameter
    ...parameterSkalarVariableDefinitions(variables),
    ...parameterArrayVariableDefinitions(variables),
  ];

  const declarations = params_sets_defines.map((def) => def[0]);
  const defines = params_sets_defines
    .map((def) => def[1])
    .filter((x) => x?.length > 0);
  const ObjectiveStatement = createObjective(modell, variables);
  const Constraints = CreateAllConstraint(modell.constraints);

  return {
    declarations,
    defines,
    ObjectiveStatement,
    Constraints,
  };
}

export default function ConvertToGMPL(
  modell: Modell,
  variables: Variable[],
  validate = false
) {
  const { declarations, defines, ObjectiveStatement, Constraints } =
    getStatements(modell, variables);

  if (validate) {
    validateEasyUI(declarations, defines, ObjectiveStatement, Constraints);
  }

  const constraintStatements = Constraints.map((c) => c[1]).join("\n");

  let gmpl = declarations.join(";\n") + ";\n\n";
  gmpl += ObjectiveStatement + "\n\n";
  gmpl += constraintStatements + "\n\n";
  gmpl += "solve;\n\n";
  if (defines.length > 0) {
    gmpl += "data;\n";
    gmpl += defines.join(";\n") + ";\n\n";
  }
  gmpl += "end;\n";

  console.log("EASY UI GMPL", gmpl);
  return gmpl;
}
