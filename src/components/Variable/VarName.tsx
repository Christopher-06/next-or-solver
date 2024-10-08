import { setName } from "@/store/slices/Variables";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import NameInput from "../NameInput/NameInput";

export default function VariableName({ var_idx }: { var_idx: number }) {
  const dispatch = useDispatch();
  const all_var_names = useSelector((state: RootState) =>
    state.variables.map((v) => v.name)
  );
  const [var_name, var_dimType] = useSelector((state: RootState) => [
    state.variables[var_idx].name,
    state.variables[var_idx].dimensionType,
  ]);

  // Validation of the name
  let helperText = "";
  if (var_dimType === "SET" && var_name !== "") {
    // Enforce first letter to be uppercase
    if (var_name[0] !== var_name[0].toUpperCase()) {
      helperText = "Sets should start with an uppercase letter";
    }
  }
  if (all_var_names.filter((n) => n === var_name).length > 1) {
    helperText = "Variable names must be unique";
  }

  // only accept numbers and underscores in the middle
  const inputRegex = /^[a-zA-Z][a-zA-Z0-9_]*$/;
  if (!inputRegex.test(var_name)) {
    helperText =
      "Variable names must start with a letter and only contain letters, numbers and underscores";
  }

  return (
    <NameInput
      name={var_name}
      setName={(name: string) => {
        dispatch(setName({ index: var_idx, name }));
      }}
      errorText={var_name !== "" ? helperText : ""}
    />
  );
}
