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

import { Grid2, TextField } from "@mui/material";
import { useTranslations } from "next-intl";

export default function Constraint() {
    const t = useTranslations();

  return (
    <div>
      <Grid2 container rowSpacing={3} columnSpacing={{xs: 1, sm: 2, md: 3 }}>
        <TextField id="constraint_name" label={t("constraint.name")}/>
        <TextField id="constraint" label={t("constraint.constraint")}/>
      </Grid2>
    </div>
  );
}
