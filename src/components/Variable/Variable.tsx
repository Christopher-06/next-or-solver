import { Grid2, MenuItem, Select, TextField } from "@mui/material";
import { useTranslations } from "next-intl";

export default function Variable() {
  const t = useTranslations();

  return (
    <div>
      <Grid2 container rowSpacing={3} columnSpacing={{xs: 1, sm: 2, md: 3 }}>
        <Select labelId="demo-simple-select-standard-label" id="variable_type" label={t("variable.type.name")} autoWidth defaultValue={0}>
          <MenuItem value={0}>{t("variable.type.reel")}</MenuItem>
          <MenuItem value={1}>{t("variable.type.int")}</MenuItem>
          <MenuItem value={2}>{t("variable.type.set")}</MenuItem>
        </Select>
        <TextField id="variable_name" label={t("variable.name")}/>
        <TextField id="variable_dimension" label={t("variable.dimension")}/>
      </Grid2>
    </div>
  );
}
