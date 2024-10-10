import { FileFormat } from "@/components/Converter/FileFormat";
import glpk from "glpk.js";
import { HighsModelStatus, HighsSolution } from "highs";

// Solve via GMPL or LP

function solveLP(lp_problem: string) {
  const lp = glpk.glp_create_prob();

  // Read Problem
  let pos = 0;
  glpk.glp_read_lp(
    lp,
    null,
    () => {
      if (pos < lp_problem.length) {
        return lp_problem[pos++];
      }
      return -1;
    },
    false
  );

  glpk.glp_scale_prob(lp, glpk.GLP_SF_AUTO);

  // Solve Simplex
  const smcp = new glpk.SMCP({ presolve: glpk.GLP_ON });
  glpk.glp_simplex(lp, smcp);

  // Integer Opt
  const iocp = new glpk.IOCP({ presolve: glpk.GLP_ON });
  glpk.glp_intopt(lp, iocp);

  return lp;
}

function solveGMPL(gmpl_problem: string, outputFunc: (msg: string) => void) {
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
  glpk.glp_mpl_generate(tran, null, outputFunc);
  glpk.glp_mpl_build_prob(tran, lp);

  glpk.glp_scale_prob(lp, glpk.GLP_SF_AUTO);

  // Solve Simplex
  const smcp = new glpk.SMCP({ presolve: glpk.GLP_ON });
  glpk.glp_simplex(lp, smcp);

  // Integer Opt
  const iocp = new glpk.IOCP({ presolve: glpk.GLP_ON });
  glpk.glp_intopt(lp, iocp);

  // Back to the mpl model
  glpk.glp_mpl_postsolve(tran, lp, glpk.GLP_MIP);

  return lp;
}

export default function solveGLPK(
  problem: string,
  currentFormat: FileFormat,
  logFunc: (msg: string) => void = (msg: string) => {
    console.log("GLPK log", msg);
  },
  outputFunc: (msg: string) => void = (msg: string) => {
    console.log("GLPK output", msg);
  }
): HighsSolution {
  let lp = null;
  if (currentFormat == FileFormat.CPLEX_LP) {
    lp = solveLP(problem);
  } else if (currentFormat == FileFormat.GMPL) {
    // subsribe to logs
    const log = (glpk.glp_print_func = logFunc);
    glpk.glp_set_print_func(log);

    lp = solveGMPL(problem, outputFunc);

    // unsubscribe from logs
    glpk.glp_set_print_func(() => {});
    glpk.glp_print_func = () => {};
  } else {
    throw new Error("Unsupported format for solving with GLPK");
  }

  // Get status
  let status : HighsModelStatus = "Optimal";
  switch(glpk.glp_mip_status(lp)){
			case glpk.GLP_OPT : status = "Optimal"; break;
			case glpk.GLP_UNDEF : status = "Unknown"; break;
			case glpk.GLP_INFEAS : status = "Infeasible"; break;
			case glpk.GLP_NOFEAS : status = "Primal infeasible or unbounded"; break;
			case glpk.GLP_FEAS : status = "Bound on objective reached"; break;
			case glpk.GLP_UNBND : status = "Unbounded"; break;
		}

  const solution: HighsSolution = {
    Status: status,
    ObjectiveValue: glpk.glp_mip_obj_val(lp),
    Columns: {},
    Rows: [],
  };

  // Add columns to solution
  for (let i = 1; i <= glpk.glp_get_num_cols(lp); i++) {
    const varName = glpk.glp_get_col_name(lp, i);
    const primalValue = glpk.glp_mip_col_val(lp, i);
    const dualValue = glpk.glp_get_col_dual(lp, i);

    solution.Columns[varName] = {
      Index: i - 1,
      Status: "BS",
      Lower: glpk.glp_get_col_lb(lp, i),
      Upper: glpk.glp_get_col_ub(lp, i),
      Type:
        glpk.glp_get_col_kind(lp, i) == glpk.GLP_IV ? "Integer" : "Continuous",
      Primal: primalValue,
      Dual: dualValue,
      Name: varName,
    };
  }

  // Add rows to solution
  for (let i = 1; i <= glpk.glp_get_num_rows(lp); i++) {
    const rowName = glpk.glp_get_row_name(lp, i);
    const primalValue = glpk.glp_mip_row_val(lp, i);
    const dualValue = glpk.glp_get_row_dual(lp, i);

    solution.Rows.push({
      Index: i - 1,
      Status: "BS",
      Lower: glpk.glp_get_row_lb(lp, i),
      Upper: glpk.glp_get_row_ub(lp, i),
      Primal: primalValue,
      Dual: dualValue,
      Name: rowName,
    });
  }

  return solution;
}
