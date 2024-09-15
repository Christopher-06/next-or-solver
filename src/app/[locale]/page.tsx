import Constraint from "@/components/Constraint/Constraint";
import Variable from "@/components/Variable/Variable";
import { Box, Card, Container, Grid2, MenuItem, Select, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import React from "react";

export default function Home() {
  const t = useTranslations();

  return (
    <Container maxWidth="lg">
      <Grid2 container rowSpacing={3} columnSpacing={{xs: 1, sm: 2, md: 3 }}>
        <Card variant="outlined">
          <Variable/>
          <Variable/>
        </Card>
        <Card variant="outlined">
          <Grid2 container rowSpacing={3} columnSpacing={{xs: 1, sm: 2, md: 3 }}>
            <Select labelId="demo-simple-select-standard-label" id="function_type" label={t("input.function_type")} autoWidth defaultValue={0}>
              <MenuItem value={0}>{t("input.function_type.min")}</MenuItem>
              <MenuItem value={1}>{t("input.function_type.max")}</MenuItem>
            </Select>
            <TextField id="function" label={t("input.function")}/>
          </Grid2>
        </Card>
        <Card variant="outlined">
          <Constraint/>
          <Constraint/>
        </Card>
      </Grid2>
    </Container>
  );
}
