
import { useContext } from "react";
import { authContext } from "../context/AuthContext";

export const useAuth = () => {
  const context = useContext(authContext);
  return context;
};
