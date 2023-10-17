import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect } from "react";
export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuth debe estar dentro del proveedor AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }) {
  const user = {
    login: false,
  };
  return (
    <authContext.Provider value={{ user }}>{children}</authContext.Provider>
  );
}
