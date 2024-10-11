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

import { Pair } from "../helper";
import { Constraint } from "../types/Modell";


function AddConstraint(constraint : Constraint) {
    let gmpl = constraint.name;

    // All Quantor
    const all_quantor = constraint.for_all.map((for_all) => {
        return for_all.index_name + " in " + for_all.set_name;
    })
    if(all_quantor.length > 0) {
        gmpl += "{" + all_quantor.join(", ") + "}";
    }

    gmpl += ": " + constraint.formular.trim();
    return gmpl;
}

export default function CreateAllConstraint(constraints : Constraint[]) : Pair<Constraint, string>[] {
  return constraints
  .filter((constraint) => constraint.formular.trim().length > 0)
  .map((constraint) => [constraint, "s.t. " + AddConstraint(constraint) + ";"]);
}