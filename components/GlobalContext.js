import { createContext, useContext, useState, useEffect } from "react";

// Create the Context
export const GlobalContext = createContext();

// Create the Provider component
export const GlobalProvider = ({ children }) => {
  // Load state from localStorage on mount
  const [state, setState] = useState(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("userState");
      return savedState ? JSON.parse(savedState) : {
        name: "",
        email: "",
        role_name: "",
        user_id: "",
        employee_type: "",
      }; // Default structure to prevent errors
    }
    return {
      name: "",
      email: "",
      role_name: "",
      user_id: "",
      employee_type: "",
    };
  });

  useEffect(() => {
    if (state) {
      localStorage.setItem("userState", JSON.stringify(state));
    }
  }, [state]);

  useEffect(() => {
    const handleStorageChange = () => {
      const savedState = localStorage.getItem("userState");
      if (savedState) {
        setState(JSON.parse(savedState));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ✅ Function to update state and merge changes
  const updateState = (newState) => {
    setState((prevState) => ({
      ...prevState, // Keep existing properties
      ...newState,  // Update only new properties
    }));

    localStorage.setItem("userState", JSON.stringify({ ...state, ...newState }));
  };

  return (
    <GlobalContext.Provider value={{ state, updateState }}>
      {children}
    </GlobalContext.Provider>
  );
};

// ✅ Hook to use the context
export const useGlobalContext = () => useContext(GlobalContext);
