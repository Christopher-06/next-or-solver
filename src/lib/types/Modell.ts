export type Sense = "MAX" | "MIN";

export interface Constraint {
  _id: string;
  name: string;
  formular: string;
}

export type Modell = {
  objective_formular: string;
  sense: Sense;
  constraints: Constraint[];
};
