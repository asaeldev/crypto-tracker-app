import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import EnhancedTable from "./components/EnhancedTable/EnhancedTable";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { AuthContext, AuthContextProvider } from "./store/auth.context";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { useContext, useEffect } from "react";
import MyAlerts from "./pages/MyAlerts";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#fafafa",
      dark: "#c7c7c7",
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
  const authContext = useContext(AuthContext);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          {!authContext.isLoggedIn && (
            <Route path="/" element={<SignIn />}></Route>
          )}
          {authContext.isLoggedIn && (
            <Route path="/" element={<Home />}></Route>
          )}
          {authContext.isLoggedIn && (
            <Route path="/alerts" element={<MyAlerts />}></Route>
          )}
          {!authContext.isLoggedIn && (
            <Route path="/SignUp" element={<SignUp />}></Route>
          )}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
