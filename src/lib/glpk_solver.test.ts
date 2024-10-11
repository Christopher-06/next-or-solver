/*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, version 2 of the License.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.
*/

import { FileFormat } from "@/components/Converter/FileFormat";
import solveGLPK from "./glpk_solver";

const CPLEX_LP_PROBLEM_SIMPLE = `Maximize
 obj:
    x1 + 2 x2 + 4 x3 + x4
Subject To
 c1: - x1 + x2 + x3 + 10 x4 <= 20
 c2: x1 - 4 x2 + x3 <= 30
 c3: x2 - 0.5 x4 = 0
Bounds
 0 <= x1 <= 40
 2 <= x4 <= 3
End
`;

const GMPL_PROBLEM_SIMPLE = `var x1;
var x2;
maximize obj: 0.6 * x1 + 0.5 * x2;
s.t. c1: x1 + 2 * x2 <= 1;
s.t. c2: 3 * x1 + x2 <= 2;
solve;
display x1, x2;
end;`;

describe("GLPK Solver", () => {
  it("should solve simple GMPL problem", () => {
    const logFunc = jest.fn();
    const outputFunc = jest.fn();
    const solution = solveGLPK(
      GMPL_PROBLEM_SIMPLE,
      FileFormat.GMPL,
      logFunc,
      outputFunc
    );

    expect(logFunc).toHaveBeenCalled();
    // expect(outputFunc).toHaveBeenCalledTimes(3);

    expect(solution.Status).toBe("Optimal");
    expect(solution.ObjectiveValue).toBe(0.46);
  });

  it("should solve simple LP problem", () => {
    const logFunc = jest.fn();
    const outputFunc = jest.fn();
    const solution = solveGLPK(
      CPLEX_LP_PROBLEM_SIMPLE,
      FileFormat.CPLEX_LP,
      logFunc,
      outputFunc
    );

    expect(logFunc).not.toHaveBeenCalled();
    expect(outputFunc).not.toHaveBeenCalled();

    expect(solution.Status).toBe("Optimal");
    expect(solution.ObjectiveValue).toBe(87.5);
  });
});
