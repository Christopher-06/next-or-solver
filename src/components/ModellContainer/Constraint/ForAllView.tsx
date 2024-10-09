import { ForAllType } from "@/lib/types/Modell";
import { Button, Stack, Tooltip, Typography } from "@mui/material";
import React from "react";
import ForAllDialog from "./ForAllDialog";
import { useMouseContext } from "@/components/MouseProvider/MouseProvider";

export default function ForAllView({
  forAll,
  SetForAll,
}: {
  forAll: ForAllType[];
  SetForAll: (forAll: ForAllType[]) => void;
}) {
  const { isInside, setIsInside, setKeepInside } = useMouseContext();
  const [openModal, setOpenModal] = React.useState(false);

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
      <Tooltip title="Wähle AllQuantor Operationen">
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
              <Typography variant="h6" key={index} textAlign="center" textTransform="none">
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
