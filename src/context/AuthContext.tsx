import { createContext } from "react";
import { AuthContextType } from "../types/types";

export const authContext = createContext<AuthContextType | undefined>(
  undefined
);