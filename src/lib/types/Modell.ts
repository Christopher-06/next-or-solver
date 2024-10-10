export type Sense = "MAX" | "MIN";

export type ForAllType = {
  set_name : string;
  index_name : string;
}

export interface Constraint {
  _id: string;
  name: string;
  for_all: ForAllType[];
  formular: string;
}

export type Modell = {
  objective_formular: string;
  sense: Sense;
  constraints: Constraint[];
};
