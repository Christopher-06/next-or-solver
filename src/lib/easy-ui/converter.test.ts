import { HighsSolution } from "highs";
import { createUniqueID } from "../helper";
import { Modell } from "../types/Modell";
import { Variable } from "../types/Variable";

import highsLoader from "highs";
import ConvertToGMPL from "./converter";
import convertLP from "@/components/File/Converter";
import { FileFormat } from "@/components/File/FileFormat";

describe("easy-ui/converter", () => {
  it("should convert TRANSPORT_PROBLEM to GMPL", async () => {
    // convert easy ui model to GMPL and then to LP
    const gmpl_problem = ConvertToGMPL(
      TRANSPORT_PROBLEM.modell,
      TRANSPORT_PROBLEM.variables
    );
    const lp_problem = convertLP(
      gmpl_problem,
      FileFormat.GMPL,
      FileFormat.CPLEX_LP
    );
    expect(lp_problem).toBeDefined();

    // check by solving the problem with highs
    const highs = await highsLoader();
    const solution: HighsSolution = highs.solve(lp_problem as string);

    // check the solution
    expect(solution.Status).toBe("Optimal");
    expect(solution.ObjectiveValue).toBe(156.375);
  });
});

const TRANSPORT_PROBLEM: {
  modell: Modell;
  variables: Variable[];
} = {
  modell: {
    objective_formular: "sum{i in I, j in J} (f * d[i,j] / 1000) * x[i,j]",
    sense: "MIN",
    constraints: [
      {
        _id: createUniqueID(),
        name: "supply",
        formular: "sum{j in J} x[i,j] <= a[i]",
        for_all: [
          {
            set_name: "I",
            index_name: "i",
          },
        ],
      },
      {
        _id: createUniqueID(),
        name: "demand",
        formular: "sum{i in I} x[i,j] >= b[j]",
        for_all: [
          {
            set_name: "J",
            index_name: "j",
          },
        ],
      },
    ],
  },
  variables: [
    {
      _id: createUniqueID(),
      name: "x",
      lowerBound: 0,
      valueType: "INTEGER",
      propertyType: "DECISION",
      dimensionType: "ARRAY",
      dimList: ["I", "J"],
      dataValue: [],
    },
    {
      _id: createUniqueID(),
      name: "I",
      valueType: "CONTINUOUS",
      propertyType: "PARAMETER",
      dimensionType: "SET",
      dimList: [],
      dataValue: new Set<string>(["Seattle", "San-Diego"]),
    },
    {
      _id: createUniqueID(),
      name: "J",
      valueType: "CONTINUOUS",
      propertyType: "PARAMETER",
      dimensionType: "SET",
      dimList: [],
      dataValue: new Set<string>(["New-York", "Chicago", "Topeka"]),
    },
    {
      _id: createUniqueID(),
      name: "a",
      valueType: "CONTINUOUS",
      propertyType: "PARAMETER",
      dimensionType: "ARRAY",
      dimList: ["I"],
      dataValue: [350, 600],
    },
    {
      _id: createUniqueID(),
      name: "b",
      valueType: "CONTINUOUS",
      propertyType: "PARAMETER",
      dimensionType: "ARRAY",
      dimList: ["J"],
      dataValue: [325, 300, 275],
    },
    {
      _id: createUniqueID(),
      name: "d",
      valueType: "CONTINUOUS",
      propertyType: "PARAMETER",
      dimensionType: "ARRAY",
      dimList: ["I", "J"],
      dataValue: [2.5, 1.8, 1.8, 2.5, 1.8, 1.4],
    },
    {
      _id: createUniqueID(),
      name: "f",
      valueType: "CONTINUOUS",
      propertyType: "PARAMETER",
      dimensionType: "SKALAR",
      dimList: [],
      dataValue: 90,
    },
  ],
};
