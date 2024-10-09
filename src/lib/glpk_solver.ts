
import { FileFormat } from "@/components/File/FileFormat";
import convertLP from "@/components/File/Converter"
import glpk from 'glpk.js';


export default async function solveGLPK(problem: string, currentFormat: FileFormat) {
  console.log("GLPK Solver: " + currentFormat);
  var log = glpk.glp_print_func = function(value){ console.log("logging", value)}
  // Konvertiere das Problem ins richtige Format (z.B. CPLEX LP)
  let problem_lp = convertLP(problem, currentFormat, FileFormat.CPLEX_LP);
  console.log("GLPK LP: " + problem_lp);

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
 
  var smcp = new glpk.SMCP({presolve: glpk.GLP_ON});
  glpk.glp_simplex(lp, smcp);

  var iocp = new glpk.IOCP({presolve: glpk.GLP_ON});
  glpk.glp_intopt(lp, iocp);

  log("obj: " + glpk.glp_mip_obj_val(lp));

  const solution = {
    Status: "Optimal", 
    ObjectiveValue: glpk.glp_mip_obj_val(lp),
    Columns: {},
    Rows: []  
  };
/*
  for(var i = 1; i <= glpk.glp_get_num_cols(lp); i++){
      log(glpk.glp_get_col_name(lp, i)  + " = " + glpk.glp_mip_col_val(lp, i));
      //Struturelles  Objekt HIGHs SoLution Format
      //
  }
  return null;
  */
  for (let i = 1; i <= glpk.glp_get_num_cols(lp); i++) {
    const varName = glpk.glp_get_col_name(lp, i);
    const primalValue = glpk.glp_mip_col_val(lp, i);
    const dualValue = glpk.glp_get_col_dual(lp, i); 
  
  
    solution.Columns[varName] = {
      Index: i - 1,  
      Status: "BS",  
      Lower: glpk.glp_get_col_lb(lp, i),  
      Upper: glpk.glp_get_col_ub(lp, i),  
      Type: "Continuous", 
      Primal: primalValue,  
      Dual: dualValue,  
      Name: varName  
    };
  
   
    log(`${varName}: Primal = ${primalValue}, Dual = ${dualValue}`);
  }
  
  return solution;
}
/*
import glpk from 'glpk.js';

const lp = {
  name: 'sample',
  objective: {
    direction: 'max',
    name: 'obj',
    vars: [
      { name: 'x1', coef: 1 },
      { name: 'x2', coef: 2 }
    ]
  },
  subjectTo: [
    {
      name: 'c1',
      vars: [
        { name: 'x1', coef: 1 },
        { name: 'x2', coef: 1 }
      ],
      bnds: { type: 'UP', ub: 1 }
    },
    {
      name: 'c2',
      vars: [
        { name: 'x1', coef: 1 },
        { name: 'x2', coef: 0 }
      ],
      bnds: { type: 'UP', ub: 0.5 }
    }
  ],
  bounds: [
    { name: 'x1', type: 'LO', lb: 0 },
    { name: 'x2', type: 'LO', lb: 0 }
  ]
};

glpk.solve(lp, (error, result) => {
  if (error) {
    console.error(error);
  } else {
    console.log(result);
  }
});
*/