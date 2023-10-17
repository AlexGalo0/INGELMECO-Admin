import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut , signInWithEmailAndPassword} from "firebase/auth";
import { ReactNode } from "react";
import { auth } from "../config/firebase";
export const authContext = createContext();
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
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logout = () => signOut(auth);
  useEffect(() => {
    const unsubuscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log({ currentUser });
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubuscribe();
  }, []);
  return (
    <authContext.Provider value={{ user, login, logout , loading}}>
      {children}
    </authContext.Provider>
  );
}
