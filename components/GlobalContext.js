import { createContext, useContext, useState, useEffect } from "react";

// Create the Context
export const GlobalContext = createContext();

// Create the Provider component
export const GlobalProvider = ({ children }) => {
  // Load state from localStorage on mount
  const [state, setState] = useState(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("userState");
      return savedState ? JSON.parse(savedState) : null;
    }
    return null;
  });

  // Function to update state and persist it in localStorage
  const updateState = (newState) => {
    setState(newState);
    localStorage.setItem("userState", JSON.stringify(newState));
  };

  return (
    <GlobalContext.Provider value={{ state, updateState }}>
      {children}
    </GlobalContext.Provider>
  );
};
