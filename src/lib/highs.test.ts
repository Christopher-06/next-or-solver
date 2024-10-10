/* eslint-disable @typescript-eslint/no-var-requires */
import "@testing-library/jest-dom";
import { FileFormat } from "@/components/Converter/FileFormat";
import { HighsSolution } from "highs";
const highsLoader = require("highs");

const CPLEX_LP_PROBLEM = `Maximize
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

const GMPL_PROBLEM = `var x1;
var x2;
maximize obj: 0.6 * x1 + 0.5 * x2;
s.t. c1: x1 + 2 * x2 <= 1;
s.t. c2: 3 * x1 + x2 <= 2;
solve;
display x1, x2;
end;`;

describe("highs solver", () => {
  beforeAll(async () => {
    // Mock the highs module
    const highs_solve = (await highsLoader()).solve;
    const highs_mock = jest.fn().mockResolvedValue({
      solve: (lp_problem: string) => highs_solve(lp_problem),
    });
    jest.mock("highs", () => highs_mock);
  });

  it("should solve a simple GMPL problem", async () => {
    const solve = require("@/lib/highs").default;
    const solution: HighsSolution = await solve(GMPL_PROBLEM, FileFormat.GMPL);
    expect(solution.Status).toBe("Optimal");
    expect(solution.ObjectiveValue).toBe(0.46);
  });

  it("should solve a simple LP problem", async () => {
    const solve = require("@/lib/highs").default;
    const solution: HighsSolution = await solve(
      CPLEX_LP_PROBLEM,
      FileFormat.CPLEX_LP
    );
    expect(solution.Status).toBe("Optimal");
    expect(solution.ObjectiveValue).toBe(87.5);
  });

  it("empty problem should return empty", async () => {
    const solve = require("@/lib/highs").default;
    const solution: HighsSolution = await solve("", FileFormat.CPLEX_LP);
    expect(solution.Status).toBe("Empty");
  });

  it("invalid gmpl problem should throw exception", async () => {
    const solve = require("@/lib/highs").default;

    try {
      await solve(CPLEX_LP_PROBLEM, FileFormat.GMPL);
      fail("Should throw exception");
    } catch (e) {
      expect(e).toBeDefined();
    }
  });
});
