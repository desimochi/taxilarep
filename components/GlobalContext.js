"use client";
import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, setState] = useState(null);

  useEffect(() => {
    const cookieUser = Cookies.get("user");
    if (cookieUser) {
      try {
        setState(JSON.parse(cookieUser));
      } catch {
        setState(null);
      }
    }
  }, []);

  const updateState = (newState) => {
    setState(newState);
    Cookies.set("user", JSON.stringify(newState), { expires: 1, path: "/" });
  };

  const logout = () => {
    setState(null);
    Cookies.remove("user");
  };

  return (
    <GlobalContext.Provider value={{ state, updateState, logout }}>
      {children}
    </GlobalContext.Provider>
  );
};
