import { AuthProviderProps, User } from "../types/types";
import { authContext } from "../context/AuthContext";

export function AuthProvider({ children }: AuthProviderProps) {
  const user: User = { login: true };
  return (
    <authContext.Provider value={{ user }}>{children}</authContext.Provider>
  );
}