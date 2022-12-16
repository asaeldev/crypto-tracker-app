import React, { useMemo, useRef, useState } from "react";
import MyAlertsTable from "../components/AlertsTable/MyAlertsTable";
import Navbar from "../components/Navbar/Navbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import FormDialog from "../components/FormDialog/FormDialog";
import { TextField } from "@mui/material";

const data = [
  {
    id: 1,
    assetId: "Bitcoin",
    telegramId: "123456",
    desiredPrice: "17180.93559",
    createdAt: "2022-12-13T08:01:40.667Z",
    updatedAt: "2022-12-13T08:01:40.667Z",
  },
  {
    id: 2,
    assetId: "Bitcoin",
    telegramId: "123456",
    desiredPrice: "17180.93559",
    createdAt: "2022-12-13T08:02:16.445Z",
    updatedAt: "2022-12-13T08:02:16.445Z",
  },
  {
    id: 3,
    assetId: "BTC",
    telegramId: "asaelhg",
    desiredPrice: "5000",
    createdAt: "2022-12-15T23:45:35.115Z",
    updatedAt: "2022-12-15T23:45:35.115Z",
  },
];

const headCells = [
  {
    id: "asset_id",
    numeric: false,
    disablePadding: true,
    label: "ID",
  },
  {
    id: "assetId",
    numeric: false,
    disablePadding: true,
    label: "Nombre",
  },
  {
    id: "desiredPrice",
    numeric: false,
    disablePadding: false,
    label: "Precio deseado (USD)",
  },
  {
    id: "telegramId",
    numeric: true,
    disablePadding: false,
    label: "Telegram ID",
  },
  {
    id: "active",
    numeric: false,
    disablePadding: false,
    label: "Alerta activa",
  },
];

function MyAlerts() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const desiredPrice = useRef("");
  const assetId = useRef("");
  const telegramId = useRef("");

  const handleSetSelected = (newSelected) => {
    setSelected(newSelected);
  };

  const handleToggleDialog = () => {
    setOpen(!open);
  };

  const handleOnAddAlert = async () => {
    const body = {
      desiredPrice: desiredPrice.current.value,
      assetId: assetId.current.value,
      telegramId: telegramId.current.value,
    };
    const url = "http://localhost:8000/api/v1/alerts";
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data.success) {
      //TODO: Show success message
      handleToggleDialog();
    }
  };

  const getCoinPrice = () => {
    let asset = [];

    if (selected.length === 1) {
      asset = data.filter((asset) => asset.name === selected[0]);
    }

    return asset.length > 0 ? Number(asset[0].price_usd).toFixed(5) : 0.0;
  };

  const coinPrice = useMemo(() => getCoinPrice(), [selected]);

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Button
          variant="contained"
          endIcon={<AddAlertIcon />}
          onClick={handleToggleDialog}
          disabled={selected.length !== 1}
        >
          Editar alerta
        </Button>
        <MyAlertsTable
          selected={selected}
          onSelected={handleSetSelected}
          title="Mis alertas"
          rows={data}
          columns={headCells}
        />
        <FormDialog
          open={open}
          onAdd={handleOnAddAlert}
          onClose={handleToggleDialog}
          title="Crear alerta"
          description="Completa el siguiente formulario para crear una alerta."
        >
          <TextField
            autoFocus
            margin="dense"
            id="assetId"
            inputRef={assetId}
            value={selected.length > 0 ? selected[0] : ""}
            label="Moneda"
            type="text"
            aria-readonly
            fullWidth
            variant="standard"
          />
          <TextField
            inputRef={telegramId}
            autoFocus
            margin="dense"
            id="telegramId"
            label="Telegram ID"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            inputRef={desiredPrice}
            margin="dense"
            id="desiredPrice"
            label="Precio deseado (USD)"
            value={coinPrice}
            type="number"
            fullWidth
            variant="standard"
          />
        </FormDialog>
      </Container>
    </>
  );
}

export default MyAlerts;
