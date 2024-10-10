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

export default function CreateAllConstraint(constraints : Constraint[]) {

  return constraints
  .filter((constraint) => constraint.formular.trim().length > 0)
  .map((constraint) => "s.t. " + AddConstraint(constraint) + ";").join("\n");
}