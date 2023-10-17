import { createContext, useContext,  useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
export const authContext = createContext();
import { ReactNode } from "react";
interface AuthProviderProps {
    children: ReactNode;
  }
export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuth debe estar dentro del proveedor AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<{ login: boolean } | null>(null);


    const login = () => {
    
      setUser({ login: true }); // Actualiza el usuario cuando inicia sesión
    };
  
    const logout = () => {
      setUser({login:false}); // Actualiza el usuario cuando cierra sesión
    };
  return (
    <authContext.Provider value={{ user  , login , logout}}>{children}</authContext.Provider>
  );
}
