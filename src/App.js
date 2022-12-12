import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import EnhancedTable from "./components/EnhancedTable";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#fafafa",
      dark: "#002884",
      contrastText: "#000000",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
  typography: {
    primary: {
      main: "#000000",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/SignIn" element={<SignIn />}></Route>
          <Route path="/SignUp" element={<SignUp />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
