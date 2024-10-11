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

/* eslint-disable @typescript-eslint/no-var-requires */
import solveGLPK from "@/lib/glpk_solver";
import convertLP from "./Converter";
import { FileFormat } from "./FileFormat";

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
End`;

const CPLEX_LP_TO_MPS_CONVERSION = `NAME	problem
ROWS
 N	obj
 L	c1
 L	c2
 E	c3
COLUMNS
 	x1	obj	1
 	x1	c1	-1
 	x1	c2	1
 	x2	obj	2
 	x2	c1	1
 	x2	c2	-4
 	x2	c3	1
 	x3	obj	4
 	x3	c1	1
 	x3	c2	1
 	x4	obj	1
 	x4	c1	10
 	x4	c3	-0.5
RHS
 	RHS	c1	20
 	RHS	c2	30
 	RHS	c3	0
BOUNDS
 UP	BND	x1	40
 LO	BND	x4	2
 UP	BND	x4	3
ENDDATA`;

const GMPL_PROBLEM_SIMPLE = `var x1;
var x2;
maximize obj: 0.6 * x1 + 0.5 * x2;
s.t. c1: x1 + 2 * x2 <= 1;
s.t. c2: 3 * x1 + x2 <= 2;
solve;
display x1, x2;
end;`;

const GMPL_TO_MPS_CONVERSION = `NAME	problem
ROWS
 N	obj
 L	c1
 L	c2
COLUMNS
 	x1	obj	0.6
 	x1	c2	3
 	x1	c1	1
 	x2	obj	0.5
 	x2	c2	1
 	x2	c1	2
RHS
 	RHS	c1	1
 	RHS	c2	2
BOUNDS
ENDDATA`;

describe("converter", () => {
  it("CPLEX LP to CPLEX LP conversion", () => {
    // do not touch the content
    const content = CPLEX_LP_PROBLEM_SIMPLE;
    const result = convertLP(content, FileFormat.CPLEX_LP, FileFormat.CPLEX_LP);
    expect(result).toBe(content);
  });

  it("GMPL to GMPL conversion", () => {
    // do not touch the content
    const content = GMPL_PROBLEM_SIMPLE;
    const result = convertLP(content, FileFormat.GMPL, FileFormat.GMPL);
    expect(result).toBe(content);
  });

  it("MPS to MPS conversion", () => {
    // do not touch the content
    const content = "MPS to MPS conversion";
    const result = convertLP(content, FileFormat.MPS, FileFormat.MPS);
    expect(result).toBe(content);
  });

  it("GMPL to CPLEX LP conversion", () => {
    const result = convertLP(
      GMPL_PROBLEM_SIMPLE,
      FileFormat.GMPL,
      FileFormat.CPLEX_LP
    );
    expect(result).toBeDefined();

    const gmplSolution = solveGLPK(GMPL_PROBLEM_SIMPLE, FileFormat.GMPL);
    const lpSolution = solveGLPK(result || "", FileFormat.CPLEX_LP);

    expect(gmplSolution.Status).toBe(lpSolution.Status);
    expect(gmplSolution.ObjectiveValue).toBeCloseTo(lpSolution.ObjectiveValue);
  });

  it("GMPL to MPS conversion", () => {
    const result = convertLP(
      GMPL_PROBLEM_SIMPLE,
      FileFormat.GMPL,
      FileFormat.MPS
    );
    expect(result).toBe(GMPL_TO_MPS_CONVERSION);
  });

  it("CPLEX LP to MPS conversion", () => {
    const result = convertLP(
      CPLEX_LP_PROBLEM_SIMPLE,
      FileFormat.CPLEX_LP,
      FileFormat.MPS
    );
    expect(result).toBe(CPLEX_LP_TO_MPS_CONVERSION);
  });
});
