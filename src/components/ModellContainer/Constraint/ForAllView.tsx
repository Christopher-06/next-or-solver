import { ForAllType } from "@/lib/types/Modell";
import { Button, Stack, Tooltip, Typography } from "@mui/material";
import React from "react";
import ForAllDialog from "./ForAllDialog";
import { useMouseContext } from "@/components/MouseProvider/MouseProvider";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useTranslations } from "next-intl";

export default function ForAllView({
  forAll,
  SetForAll,
}: {
  forAll: ForAllType[];
  SetForAll: (forAll: ForAllType[]) => void;
}) {
  const t = useTranslations();
  const { isInside, setIsInside, setKeepInside } = useMouseContext();
  const [openModal, setOpenModal] = React.useState(false);

  const all_users_set_variable_names = useSelector((state: RootState) =>
    state.variables
      .filter(
        (variable) => variable.dimensionType === "SET" && variable.name !== ""
      )
      .map((variable) => variable.name)
  );

  // validation
  const helperText = "";
  

  const handleDialogOpen = () => {
    setOpenModal(true);
    setKeepInside(true);
  };

  const handleCloseDialog = () => {
    setOpenModal(false);
    setKeepInside(false);
    setIsInside(false);
  };

  if (!isInside && forAll.length === 0) {
    return <></>;
  }

  return (
    <>
      <Tooltip title={helperText !== "" ? helperText : t("modell_container.constraint.choose_allQuantor")}>
        <Button
          sx={{
            color: "text.primary",
            borderColor: "text.primary",
            mx: 1,
          }}
          onClick={handleDialogOpen}
          variant={isInside ? "outlined" : "text"}
        >
          {/* Draw AllQuantor Operator */}
          <Typography variant="h4">&forall;</Typography>

          {/* List all variables and their corresponding sets */}
          <Stack direction="column" spacing={0} sx={{ ml: 1 }}>
            {forAll.map((row, index) => (
              <Typography variant="h6" key={index} textAlign="center" textTransform="none"
                color={
                  all_users_set_variable_names.indexOf(row.set_name) === -1
                  ? "error" : "text.primary"}
              >
                {row.index_name} ∈ {row.set_name}
              </Typography>
            ))}
          </Stack>
        </Button>
      </Tooltip>

      {/* Modal */}
      <ForAllDialog
        open={openModal}
        handleClose={handleCloseDialog}
        forAll={forAll}
        SetForAll={SetForAll}
      />
    </>
  );
}
