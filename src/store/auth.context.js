import React, { useState, useEffect, useCallback } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const retrieveToken = () => {
  return localStorage.getItem("token");
};

const AuthContextProvider = (props) => {
  const tokenData = retrieveToken();
  let initialToken;

  if (tokenData) {
    initialToken = tokenData;
  }

  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = token !== null;

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const loginHandler = (token) => {
    console.log("Hello", token);
    setToken(token);
    localStorage.setItem("token", token);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
