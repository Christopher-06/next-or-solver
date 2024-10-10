
import { FileFormat } from "@/components/File/FileFormat";
import convertLP from "@/components/File/Converter"
import glpk from 'glpk.js';
import { HighsSolution } from "highs";

// Solve via GMPL or LP
// Solver Output: glp_mpl_generate(tran, null, function(data){$("#glpkOutput").append(data+"<br/>")});
// Solver Output / Log auch während berechnung anzeigen (for Output e.q. print)

export default function solveGLPK(problem: string, currentFormat: FileFormat, 
  logFunc : (msg : string) => void = (msg : string) => {console.log("GLPK log", msg)},
  // outputFunc : (msg : string) => void = (msg : string) => {console.log("GLPK output", msg)}
) : HighsSolution {
  const log = glpk.glp_print_func = logFunc;
  glpk.glp_set_print_func(log);  
  
  // Konvertiere das Problem ins richtige Format (z.B. CPLEX LP)
  let problem_lp = convertLP(problem, currentFormat, FileFormat.CPLEX_LP);
  if (problem_lp == null) problem_lp = "";

  const lp = glpk.glp_create_prob();
  let pos = 0;
  glpk.glp_read_lp(lp, null, () => {
      if (pos < problem_lp.length){
          return problem_lp[pos++];
      }
          return -1;
  }, false);

  glpk.glp_scale_prob(lp, glpk.GLP_SF_AUTO);
 
  const smcp = new glpk.SMCP({presolve: glpk.GLP_ON});
  glpk.glp_simplex(lp, smcp);

  const iocp = new glpk.IOCP({presolve: glpk.GLP_ON});
  glpk.glp_intopt(lp, iocp);

  const solution : HighsSolution = {
    Status: "Optimal", 
    ObjectiveValue: glpk.glp_mip_obj_val(lp),
    Columns: {},
    Rows: []  
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
      Type: glpk.glp_get_col_kind(lp, i) == glpk.GLP_IV ? "Integer" : "Continuous", 
      Primal: primalValue,  
      Dual: dualValue,  
      Name: varName  
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
      Name: rowName  
    });
  }
  
  return solution;
}
