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

import { Variable } from "./Variable";

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

export type Easy_UI = {
  model : Modell;
  variables : Variable[]
}
