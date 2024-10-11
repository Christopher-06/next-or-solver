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

import { ForAllType } from "@/lib/types/Modell";
import { Button, Tooltip } from "@mui/material";
import React from "react";
import ForAllDialog from "./ForAllDialog";
import { useMouseContext } from "@/components/MouseProvider/MouseProvider";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useTranslations } from "next-intl";
import LatexTypography from "../latex_typography";

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

  let forAllLatexString = forAll
    .map((item) => {
      return item.index_name + " \\in " + item.set_name;
    })
    .join(" \\\\ ");
  forAllLatexString = forAllLatexString.length > 0 ? forAllLatexString : "...";

  const showError =
    forAll.filter(
      (item) => !all_users_set_variable_names.includes(item.set_name)
    ).length !== 0;

  return (
    <>
      <Tooltip
        title={
          helperText !== ""
            ? helperText
            : t("modell_container.constraint.choose_allQuantor")
        }
      >
        <Button
          sx={{
            color: "text.primary",
            borderColor: "text.primary",
            mx: 1,
            p: 0,
          }}
          onClick={handleDialogOpen}
          variant={isInside ? "outlined" : "text"}
        >
          <LatexTypography
            formular={
              "\\ \\forall \\begin{align*} " +
              forAllLatexString +
              " \\end{align*}"
            }
            error={showError}
          />
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
