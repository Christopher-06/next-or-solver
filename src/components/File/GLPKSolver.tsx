import { useEffect, useState } from 'react';

declare global {
  interface Window {
    glp_create_prob: any;
    glp_read_lp_from_string: any;
    glp_scale_prob: any;
    GLP_SF_AUTO: any;
    SMCP: any;
    glp_simplex: any;
    glp_get_num_cols: any;
    glp_get_col_name: any;
    glp_get_col_prim: any;
    glp_get_obj_val: any;
  }
}

const GLPKSolver = () => {
  const [solution, setSolution] = useState<string | null>(null);

  useEffect(() => {
    // Dynamisch das GLPK-Skript laden
    const loadGLPK = async () => {
      const script = document.createElement('script');
      script.src = '/glpk.min.js'; // Pfad zu deiner glpk.min.js im public-Verzeichnis
      script.onload = () => {
        solveLP();
      };
      document.body.appendChild(script);
    };

    const solveLP = () => {
      try {
        const lp = window.glp_create_prob();
        const lpProblem =
          'Maximize\n obj: x1 + 2 x2\nSubject To\n c1: x1 + x2 <= 10\nBounds\n 0 <= x1 <= 5\n 0 <= x2 <= 5\nEnd';

        window.glp_read_lp_from_string(lp, null, lpProblem);
        window.glp_scale_prob(lp, window.GLP_SF_AUTO);

        const smcp = new window.SMCP({ presolve: true });
        window.glp_simplex(lp, smcp);

        let result = '';
        const objective = window.glp_get_obj_val(lp);
        for (let i = 1; i <= window.glp_get_num_cols(lp); i++) {
          result += `${window.glp_get_col_name(lp, i)}: ${window.glp_get_col_prim(lp, i)}\n`;
        }

        setSolution(`Objective: ${objective}\n${result}`);
      } catch (error) {
        console.error('Fehler bei der Berechnung: ', error);
        setSolution('Fehler bei der Berechnung');
      }
    };

    loadGLPK();
  }, []);

  return (
    <div>
      <h1>LP-Solver</h1>
      {solution ? <pre>{solution}</pre> : <p>Laden...</p>}
    </div>
  );
};

export default GLPKSolver;
