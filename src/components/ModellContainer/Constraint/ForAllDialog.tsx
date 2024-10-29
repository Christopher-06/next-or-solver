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

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper, { PaperProps } from "@mui/material/Paper";
import Draggable from "react-draggable";
import { ForAllType } from "@/lib/types/Modell";
import {
  Box,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useTranslations } from "next-intl";

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function ForAllDialog({
  open,
  handleClose,
  forAll,
  SetForAll,
}: {
  forAll: ForAllType[];
  SetForAll: (forAll: ForAllType[]) => void;
  open: boolean;
  handleClose: () => void;
}) {
  const t = useTranslations();
  const all_user_variables = useSelector((state: RootState) => state.variables);
  const all_users_set_variable_names = all_user_variables
    .filter(
      (variable) => variable.dimensionType === "SET" && variable.name !== ""
    )
    .map((variable) => variable.name);

  const SingleRow = ({ set_name, index_name }: ForAllType, index: number) => {
    const set_name_not_aval =
      all_users_set_variable_names.indexOf(set_name) === -1;

    const handleIndexChange = (value: string) => {
      const new_for_all = [...forAll];

      // add row if last row is filled
      if (index === new_for_all.length) {
        new_for_all.push({ set_name, index_name: value });
      }

      new_for_all[index] = { set_name, index_name: value.trim() };
      SetForAll(new_for_all);
    };

    const handleSetChange = (value: string) => {
      const new_for_all = [...forAll];

      // add row if last row is filled
      if (index === new_for_all.length) {
        new_for_all.push({ set_name: value, index_name });
      }

      new_for_all[index] = { set_name: value, index_name };
      SetForAll(new_for_all);
    };

    const handleClickDelete = () => {
      const new_for_all = [...forAll];
      new_for_all.splice(index, 1);
      SetForAll(new_for_all);
    };

    return (
      <Box
        key={index}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <TextField
          label={t("modell_container.constraint.index_label")}
          variant="outlined"
          error={index_name.trim() === ""}
          value={index_name}
          onChange={(e) => handleIndexChange(e.target.value)}
          sx={{ minWidth: "150px" }}
        />
        <Typography
          variant="h6"
          textAlign="center"
          sx={{ mx: 3 }}
          alignContent="center"
        >
          ∈
        </Typography>

        <Select
          variant="outlined"
          value={set_name}
          error={set_name_not_aval}
          onChange={(e) => handleSetChange(e.target.value as string)}
          sx={{ minWidth: "150px" }}
        >
          {all_users_set_variable_names.map((name, index) => (
            <MenuItem key={index} value={name}>
              {name}
            </MenuItem>
          ))}
          {set_name_not_aval && (
            <MenuItem value={set_name}>{set_name}</MenuItem>
          )}
        </Select>

        <Tooltip title="Löschen">
          <Button
            sx={{ ml: 3, my: 1 }}
            onClick={handleClickDelete}
            variant="contained"
            disabled={forAll.length === index}
          >
            <CloseIcon />
          </Button>
        </Tooltip>
      </Box>
    );
  };

  const addNewRow =
    forAll.length === 0 || forAll[forAll.length - 1].index_name !== "";

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        AllQuantor Dialog
      </DialogTitle>
      <DialogContent>
        <Stack direction="column" spacing={1} sx={{ p: 3 }}>
          {forAll.map((entry, index) => SingleRow(entry, index))}

          {/* Add Next Empty Row */}
          {addNewRow &&
            SingleRow({ set_name: "     ", index_name: "" }, forAll.length)}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
