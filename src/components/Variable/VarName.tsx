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

import { setName } from "@/store/slices/Variables";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import NameInput from "../NameInput/NameInput";
import { useTranslations } from "next-intl";

export default function VariableName({ var_idx }: { var_idx: number }) {
  const dispatch = useDispatch();
  const t = useTranslations();
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
      helperText = t("variable.var_name.helper1");
    }
  }
  if (all_var_names.filter((n) => n === var_name).length > 1) {
    helperText = t("variable.var_name.helper2");
  }

  // only accept numbers and underscores in the middle
  const inputRegex = /^[a-zA-Z][a-zA-Z0-9_]*$/;
  if (!inputRegex.test(var_name)) {
    helperText =
    t("variable.var_name.helper3");
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
