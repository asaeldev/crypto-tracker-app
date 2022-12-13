import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

export default function FormDialog(props) {
  const { title, description, open, onClose, onAdd } = props;

  const handleClose = () => {
    onClose();
  };

  const handleAddAlert = () => {
    onAdd();
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
          {props.children}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleAddAlert}>
            Crear alerta
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
