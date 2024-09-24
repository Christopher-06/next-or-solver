export type ConstraintRow = {
  Index: number;
  Status: string;
  Lower: number;
  Upper: number;
  Primal: number;
  Dual: number;
  Name: string;
};

export type VariableColumn = {
  Index: number;
  Status: string;
  Lower: number;
  Upper: number;
  Type: string;
  Primal: number;
  Dual: number;
  Name: string;
};

export type Solution = {
  Status: "Optimal" | "Infeasible" | "Unbounded" | "Unknown";
  ObjectiveValue?: number;
  Columns: {
    [key: string]: VariableColumn;
  };
  Rows: ConstraintRow[];
};
