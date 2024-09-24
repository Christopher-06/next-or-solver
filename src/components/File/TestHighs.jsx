import { useEffect, useState } from 'react';
import highs from 'highs'; // Importiere highs.js

const SolverPage = () => {
  const [solution, setSolution] = useState(null);

  useEffect(() => {
    const solveProblem = async () => {
      // Definiere das lineare Programm
      const problem = {
        numCol: 2,
        numRow: 2,
        Astart: [0, 1, 2],
        Aindex: [0, 1],
        Avalue: [1, 1],
        colLower: [0, 0],
        colUpper: [Infinity, Infinity],
        rowLower: [-Infinity, 0],
        rowUpper: [5, 5],
        objSense: 1, // Minimierung
        objOffset: 0,
        objCoeff: [1, 1]
      };

      // Verwende highs.js zur Lösung des Problems
      const result = highs.solve(problem);

      // Setze die Lösung in den State
      setSolution(result);
    };

    solveProblem();
  }, []);

  return (
    <div>
      <h1>Linear Programming Solver</h1>
      {solution ? (
        <div>
          <p>Optimale Lösung: {solution.colValue.join(', ')}</p>
          <p>Zielfunktionswert: {solution.objValue}</p>
        </div>
      ) : (
        <p>Berechnung läuft...</p>
      )}
    </div>
  );
};

export default SolverPage;
