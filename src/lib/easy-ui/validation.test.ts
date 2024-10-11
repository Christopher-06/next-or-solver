import { createUniqueID } from "../helper";
import { Constraint, Modell } from "../types/Modell";
import { Variable } from "../types/Variable";
import { ConvertError } from "./converter";
import {
  EasyUIConstraintError,
  EasyUIObjectiveError,
  ValidateEasyUI,
} from "./validation";

describe("EASY UI validation", () => {
  it("Formal correct Transport Problem should be valid", () => {
    try {
      ValidateEasyUI(TRANSPORT_PROBLEM.modell, TRANSPORT_PROBLEM.variables);
    } catch (error) {
      fail(error);
    }
  });

  it("Transport Problem without decision variables should throw an error", () => {
    expect(() =>
      ValidateEasyUI(
        TRANSPORT_PROBLEM.modell,
        TRANSPORT_PROBLEM.variables.filter(
          (v) => v.propertyType === "PARAMETER"
        )
      )
    ).toThrow();
  });

  it("Transport Problem with invalid contraint syntax should throw an EasyUIConstraintError", () => {
    const modell = { ...TRANSPORT_PROBLEM.modell };
    modell.constraints[0].formular = "sum{j in J} x[i,j] <= a[i]DD";
    expect(() => ValidateEasyUI(modell, TRANSPORT_PROBLEM.variables)).toThrow(
      EasyUIConstraintError
    );
  });

  it("Transport Problem with invalid objective syntax should throw an EasyUIObjectiveError", () => {
    const modell = { ...TRANSPORT_PROBLEM.modell };
    modell.objective_formular =
      "sum{i in I, j in J} (f * d[i,j] / 1000) * x[i,j]DD";
    expect(() => ValidateEasyUI(modell, TRANSPORT_PROBLEM.variables)).toThrow(
      EasyUIObjectiveError
    );
  });

  it("Transport Problem with duplicate constraint names should throw an EasyUIConstraintError", () => {
    const modell = { ...TRANSPORT_PROBLEM.modell };
    modell.constraints[0].name = "SOME DUP NAME";
    modell.constraints[1].name = "SOME DUP NAME";
    expect(() => ValidateEasyUI(modell, TRANSPORT_PROBLEM.variables)).toThrow(
      EasyUIConstraintError
    );
  });

  it("Transport Problem with duplicate variable names should throw an ConvertError", () => {
    const variables = [...TRANSPORT_PROBLEM.variables];
    variables[0].name = "SOME DUP NAME";
    variables[1].name = "SOME DUP NAME";
    expect(() => ValidateEasyUI(TRANSPORT_PROBLEM.modell, variables)).toThrow(
      ConvertError
    );
  });

  it("Transport Problem with incorrect array dimension should throw an ConvertError", () => {
    const variables = [...TRANSPORT_PROBLEM.variables];
    variables[0].dimList = ["I", "J", "K"];
    expect(() => ValidateEasyUI(TRANSPORT_PROBLEM.modell, variables)).toThrow(
      ConvertError
    );
  });

  it("EasyUIConstraintError should be correct converted to string", () => {
    const c: Constraint = {
      _id: createUniqueID(),
      name: "supply",
      formular: "a + b <= c",
      for_all: [],
    };
    const error = new EasyUIConstraintError("Some error", c);
    expect(error.toString()).toBe(`Some error (${c.name})`);
  });

  it("Transport Problem with incorrect array data should throw an ConvertError", () => {
    const variables = [...TRANSPORT_PROBLEM.variables];
    variables[0].dataValue = [1, 2, 3, 4, 5];
    expect(() => ValidateEasyUI(TRANSPORT_PROBLEM.modell, variables)).toThrow(
      ConvertError
    );
  });

  it("Transport Problem with nan, inf or -inf in data should throw an ConvertError", () => {
    const variables = [...TRANSPORT_PROBLEM.variables];
    variables
      .filter((v) => v.dimensionType == "ARRAY")
      .forEach((v) => {
        if (Array.isArray(v.dataValue)) {
          v.dataValue[4] = NaN;
        }
      });
    expect(() => ValidateEasyUI(TRANSPORT_PROBLEM.modell, variables)).toThrow(
      ConvertError
    );
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
      dataValue: ["Seattle", "San-Diego"],
    },
    {
      _id: createUniqueID(),
      name: "J",
      valueType: "CONTINUOUS",
      propertyType: "PARAMETER",
      dimensionType: "SET",
      dimList: [],
      dataValue: ["New-York", "Chicago", "Topeka"],
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
