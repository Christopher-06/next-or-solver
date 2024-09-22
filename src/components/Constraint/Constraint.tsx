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
