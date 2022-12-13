import React, { useMemo, useRef, useState } from "react";
import EnhancedTable from "../components/EnhancedTable/EnhancedTable";
import Navbar from "../components/Navbar/Navbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import FormDialog from "../components/FormDialog/FormDialog";
import { TextField } from "@mui/material";

const data = [
  {
    asset_id: "USD",
    name: "US Dollar",
    type_is_crypto: 0,
    data_quote_start: "2014-02-24T17:43:05.0000000Z",
    data_quote_end: "2022-12-12T00:00:00.0000000Z",
    data_orderbook_start: "2014-02-24T17:43:05.0000000Z",
    data_orderbook_end: "2022-12-12T00:00:00.0000000Z",
    data_trade_start: "2010-07-17T23:09:17.0000000Z",
    data_trade_end: "2022-12-12T00:00:00.0000000Z",
    data_symbols_count: 155998,
    volume_1hrs_usd: 660854471708.53,
    volume_1day_usd: 19097432508803.79,
    volume_1mth_usd: 441789297941278.7,
    id_icon: "0a4185f2-1a03-4a7c-b866-ba7076d8c73b",
    data_start: "2010-07-17",
    data_end: "2022-12-12",
  },
  {
    asset_id: "BTC",
    name: "Bitcoin",
    type_is_crypto: 1,
    data_quote_start: "2014-02-24T17:43:05.0000000Z",
    data_quote_end: "2022-12-12T00:00:00.0000000Z",
    data_orderbook_start: "2014-02-24T17:43:05.0000000Z",
    data_orderbook_end: "2022-12-12T00:00:00.0000000Z",
    data_trade_start: "2010-07-17T23:09:17.0000000Z",
    data_trade_end: "2022-12-12T00:00:00.0000000Z",
    data_symbols_count: 125259,
    volume_1hrs_usd: 2742036420579.29,
    volume_1day_usd: 730171469863744400000,
    volume_1mth_usd: 8.435527490052025e21,
    price_usd: 17180.935593461374,
    id_icon: "4caf2b16-a017-4e26-a348-2cea69c34cba",
    data_start: "2010-07-17",
    data_end: "2022-12-12",
  },
  {
    asset_id: "EUR",
    name: "Euro",
    type_is_crypto: 0,
    data_quote_start: "2014-04-20T15:06:33.0000000Z",
    data_quote_end: "2022-12-12T00:00:00.0000000Z",
    data_orderbook_start: "2014-04-20T15:06:33.0000000Z",
    data_orderbook_end: "2022-12-12T00:00:00.0000000Z",
    data_trade_start: "2011-04-06T02:17:41.0000000Z",
    data_trade_end: "2022-12-12T00:00:00.0000000Z",
    data_symbols_count: 2627,
    volume_1hrs_usd: 30932705.14,
    volume_1day_usd: 111357396904.83,
    volume_1mth_usd: 1493555168157.67,
    price_usd: 1.0550649121162596,
    id_icon: "688fcf1c-92bb-4c84-ac95-0971e9bfed2f",
    data_start: "2011-04-06",
    data_end: "2022-12-12",
  },
  {
    asset_id: "CNY",
    name: "Yuan Renminbi",
    type_is_crypto: 0,
    data_quote_start: "2015-02-11T16:50:54.6130000Z",
    data_quote_end: "2022-12-10T00:00:00.0000000Z",
    data_orderbook_start: "2015-02-11T16:50:54.6130000Z",
    data_orderbook_end: "2020-08-05T14:33:23.5273964Z",
    data_trade_start: "2011-06-13T05:13:24.0000000Z",
    data_trade_end: "2022-06-10T14:00:00.0000000Z",
    data_symbols_count: 430,
    volume_1hrs_usd: 0,
    volume_1day_usd: 0,
    volume_1mth_usd: 0,
    price_usd: 0.1432150009659644,
    data_start: "2011-06-13",
    data_end: "2022-12-10",
  },
  {
    asset_id: "JPY",
    name: "Yen",
    type_is_crypto: 0,
    data_quote_start: "2014-11-14T01:42:12.5570000Z",
    data_quote_end: "2022-12-12T00:00:00.0000000Z",
    data_orderbook_start: "2014-11-14T01:42:12.5570000Z",
    data_orderbook_end: "2022-12-12T00:00:00.0000000Z",
    data_trade_start: "2011-08-27T07:48:27.0000000Z",
    data_trade_end: "2022-12-12T00:00:00.0000000Z",
    data_symbols_count: 605,
    volume_1hrs_usd: 3091335.12,
    volume_1day_usd: 204558478.5,
    volume_1mth_usd: 5902242304.37,
    price_usd: 0.007262612434318748,
    data_start: "2011-08-27",
    data_end: "2022-12-12",
  },
  {
    asset_id: "GBP",
    name: "Pound Sterling",
    type_is_crypto: 0,
    data_quote_start: "2014-11-14T01:42:12.5570000Z",
    data_quote_end: "2022-12-12T00:00:00.0000000Z",
    data_orderbook_start: "2014-11-14T01:42:12.5570000Z",
    data_orderbook_end: "2022-12-12T00:00:00.0000000Z",
    data_trade_start: "2011-09-06T06:17:27.0000000Z",
    data_trade_end: "2022-12-12T00:00:00.0000000Z",
    data_symbols_count: 637,
    volume_1hrs_usd: 1203594.55,
    volume_1day_usd: 95794950.98,
    volume_1mth_usd: 2056461409.67,
    price_usd: 1.22689,
    id_icon: "6113eae7-5525-4424-85b5-93d9e42d18f6",
    data_start: "2011-09-06",
    data_end: "2022-12-12",
  },
  {
    asset_id: "LTC",
    name: "Litecoin",
    type_is_crypto: 1,
    data_quote_start: "2014-04-20T15:06:34.0000000Z",
    data_quote_end: "2022-12-12T00:00:00.0000000Z",
    data_orderbook_start: "2014-04-20T15:06:34.0000000Z",
    data_orderbook_end: "2022-12-12T00:00:00.0000000Z",
    data_trade_start: "2013-05-19T15:23:45.0000000Z",
    data_trade_end: "2022-12-12T00:00:00.0000000Z",
    data_symbols_count: 4930,
    volume_1hrs_usd: 608724963.49,
    volume_1day_usd: 16596510220.37,
    volume_1mth_usd: 522818722580.09,
    price_usd: 76.2712717058385,
    id_icon: "a201762f-1499-41ef-9b84-e0742cd00e48",
    data_start: "2013-05-19",
    data_end: "2022-12-12",
  },
  {
    asset_id: "XRP",
    name: "Ripple",
    type_is_crypto: 1,
    data_quote_start: "2014-07-31T13:05:46.0000000Z",
    data_quote_end: "2022-12-12T00:00:00.0000000Z",
    data_orderbook_start: "2014-07-31T13:05:46.0000000Z",
    data_orderbook_end: "2022-12-12T00:00:00.0000000Z",
    data_trade_start: "2013-11-25T11:54:57.9270000Z",
    data_trade_end: "2022-12-12T00:00:00.0000000Z",
    data_symbols_count: 6482,
    volume_1hrs_usd: 82313560.35,
    volume_1day_usd: 1939904736.66,
    volume_1mth_usd: 66943859364.96,
    price_usd: 0.3893277882560222,
    id_icon: "ba90bcb0-cafb-4801-ac5d-d310f47d6411",
    data_start: "2013-11-25",
    data_end: "2022-12-12",
  },
  {
    asset_id: "DOGE",
    name: "DogeCoin",
    type_is_crypto: 1,
    data_quote_start: "2014-07-31T13:05:46.0000000Z",
    data_quote_end: "2022-12-12T00:00:00.0000000Z",
    data_orderbook_start: "2014-07-31T13:05:46.0000000Z",
    data_orderbook_end: "2022-12-12T00:00:00.0000000Z",
    data_trade_start: "2014-02-21T05:16:16.8330000Z",
    data_trade_end: "2022-12-12T00:00:00.0000000Z",
    data_symbols_count: 5344,
    volume_1hrs_usd: 63560584.21,
    volume_1day_usd: 613844405492.5,
    volume_1mth_usd: 617657175222.64,
    price_usd: 0.09010385362670555,
    id_icon: "63e240f3-047f-41c7-9179-6784bc719f63",
    data_start: "2014-02-21",
    data_end: "2022-12-12",
  },
  {
    asset_id: "ETH",
    name: "Ethereum",
    type_is_crypto: 1,
    data_quote_start: "2015-08-07T14:50:38.1774950Z",
    data_quote_end: "2022-12-12T00:00:00.0000000Z",
    data_orderbook_start: "2015-08-07T14:50:38.1774950Z",
    data_orderbook_end: "2022-12-12T00:00:00.0000000Z",
    data_trade_start: "2015-08-07T15:21:48.1062520Z",
    data_trade_end: "2022-12-12T00:00:00.0000000Z",
    data_symbols_count: 99204,
    volume_1hrs_usd: 71946353730.65,
    volume_1day_usd: 15110358940166.67,
    volume_1mth_usd: 2765036810758334.5,
    price_usd: 1274.1119940578903,
    id_icon: "604ae453-3d9f-4ad0-9a48-9905cce617c2",
    data_start: "2015-08-07",
    data_end: "2022-12-12",
  },
  {
    asset_id: "MXN",
    name: "Mexican Peso",
    type_is_crypto: 0,
    data_quote_start: "2017-08-29T15:47:12.6045423Z",
    data_quote_end: "2022-12-12T00:00:00.0000000Z",
    data_orderbook_start: "2017-08-29T15:47:12.6045423Z",
    data_orderbook_end: "2022-12-12T00:00:00.0000000Z",
    data_trade_start: "2017-08-29T12:52:59.0000000Z",
    data_trade_end: "2022-12-12T00:00:00.0000000Z",
    data_symbols_count: 59,
    volume_1hrs_usd: 287767.26,
    volume_1day_usd: 15864825.04,
    volume_1mth_usd: 501222562.57,
    price_usd: 0.050470224978892766,
    id_icon: "eb5998c9-b2c4-4685-b01f-bd32a8db042d",
    data_start: "2017-08-29",
    data_end: "2022-12-12",
  },
  {
    asset_id: "SHIB",
    name: "Shiba Inu",
    type_is_crypto: 1,
    data_quote_start: "2021-02-01T12:05:40.5820178Z",
    data_quote_end: "2022-12-12T00:00:00.0000000Z",
    data_orderbook_start: "2022-01-01T00:00:00.0000000Z",
    data_orderbook_end: "2022-12-12T00:00:00.0000000Z",
    data_trade_start: "2021-04-19T12:50:59.1520000Z",
    data_trade_end: "2022-12-12T00:00:00.0000000Z",
    data_symbols_count: 222,
    volume_1hrs_usd: 1767657882.85,
    volume_1day_usd: 45154580344.33,
    volume_1mth_usd: 1135021166231.11,
    price_usd: 0.000008934972522338752,
    data_start: "2021-02-01",
    data_end: "2022-12-12",
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
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Nombre",
  },
  {
    id: "price_usd",
    numeric: true,
    disablePadding: false,
    label: "Precio (USD)",
  },
  {
    id: "1hrp",
    numeric: true,
    disablePadding: false,
    label: "1h %",
  },
  {
    id: "volume_1mth_usd",
    numeric: true,
    disablePadding: false,
    label: "1 Mes %",
  },
  {
    id: "circulatingSupply",
    numeric: true,
    disablePadding: false,
    label: "¿Es criptomoneda?",
  },
];

function Home() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const desiredPrice = useRef("");
  const assetId = useRef("");
  const telegramId = useRef("");

  const handleSetSelected = (newSelected) => {
    console.log(newSelected);
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
          Crear alerta
        </Button>
        <EnhancedTable
          selected={selected}
          onSelected={handleSetSelected}
          title="Monedas/Criptomonedas"
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

export default Home;
