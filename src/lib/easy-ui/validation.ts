import { Constraint, Modell } from "../types/Modell";
import glpk from "glpk.js";
import { Variable } from "../types/Variable";
import { getStatements } from "./converter";
import { Pair } from "../helper";

export class EasyUIConstraintError extends Error {
  constraint: Constraint;

  constructor(message: string, constraint: Constraint) {
    super(message);
    this.constraint = constraint;
  }

  toString(): string {
    return `${this.message} (${this.constraint.name})`;
  }
}

export class EasyUIVariableDeclarationError extends Error {
  variable: string;

  constructor(message: string, variable: string) {
    super(message);
    this.variable = variable;
  }

  toString(): string {
    return `${this.message} (${this.variable})`;
  }
}

export class EasyUIVariableDefineError extends Error {
  define: string;

  constructor(message: string, define: string) {
    super(message);
    this.define = define;
  }

  toString(): string {
    return `${this.message} (${this.define})`;
  }
}

export class EasyUIObjectiveError extends Error {
  objective_formular: string;

  constructor(message: string, objective_formular: string) {
    super(message);
    this.objective_formular = objective_formular;
  }

  toString(): string {
    return `${this.message} (${this.objective_formular})`;
  }
}

export class EasyUIUnlocatedError extends Error {
  info: string;

  constructor(message: string, info: string) {
    super(message);
    this.info = info;
  }

  toString(): string {
    return `${this.message} (${this.info})`;
  }
}

function readGMPLintoGLPK(gmpl_problem: string) {
  const lp = glpk.glp_create_prob();
  const tran = glpk.glp_mpl_alloc_wksp();

  // Read Problem
  let pos = 0;
  glpk.glp_mpl_read_model(
    tran,
    null,
    () => {
      if (pos < gmpl_problem.length) {
        return gmpl_problem[pos++];
      }
      return -1;
    },
    false
  );

  // Generate Problem
  glpk.glp_mpl_generate(tran, null, () => {});
  glpk.glp_mpl_build_prob(tran, lp);
}

export function ValidateEasyUI(modell: Modell, variables: Variable[]) {
  const { declarations, defines, ObjectiveStatement, Constraints } =
    getStatements(modell, variables);

  validateEasyUI(declarations, defines, ObjectiveStatement, Constraints);
}

export function validateEasyUI(
  declarations: string[],
  defines: string[],
  objectiveStatement: string,
  constraints: Pair<Constraint, string>[]
) {
  const constraintStatements = constraints.map((c) => c[1]).join("\n");

  // build gmpl
  let gmpl = declarations.join(";\n") + ";\n";
  gmpl += objectiveStatement + "\n";
  gmpl += constraintStatements + "\n";
  gmpl += "solve;\n";
  if (defines.length > 0) {
    gmpl += "data;\n";
    gmpl += defines.join(";\n") + ";\n";
  }
  gmpl += "end;\n";

  // try to read gmpl into glpk else handle error
  try {
    readGMPLintoGLPK(gmpl);
    return; // success
  } catch (error) {
    if (error instanceof Error) {
      // handle error
      const err_msg = error.toString();
      let line = parseInt(err_msg.split(":")[2]);
      if (isNaN(line)) {
        throw new Error("Error in GMPL: " + err_msg);
      }

      // look where the error is
      // declarations
      declarations.forEach((decl) => {
        line -= 1;
        if (line <= 0) {
          throw new EasyUIVariableDeclarationError(err_msg, decl);
        }
      });

      // objective
      line -= 1;
      if (line <= 0) {
        throw new EasyUIObjectiveError(err_msg, objectiveStatement);
      }

      // constraints
      constraints.forEach((constraint) => {
        line -= 1;
        if (line <= 0) {
          throw new EasyUIConstraintError(err_msg, constraint[0]);
        }
      });

      line -= 1; // solve

      if (defines.length > 0) {
        line -= 1; // data
      }

      // defines
      defines.forEach((def) => {
        line -= (def.split("\n").length + 1);
        if (line <= 0) {
          throw new EasyUIVariableDefineError(err_msg, def);
        }
      });

      throw new EasyUIUnlocatedError(err_msg, "end");
    }
  }
}
