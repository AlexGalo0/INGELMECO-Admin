/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut , signInWithEmailAndPassword} from "firebase/auth";
import { ReactNode } from "react";
import { auth } from "../config/firebase";
import { ProductFormData } from "../types/types";

interface currentUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

interface AuthContextProps {
  user: currentUser | null;
  login: (email: string, password: string) => void;
  logout: () => Promise<void>;
  loading: boolean;
  setCurrentProduct: React.Dispatch<React.SetStateAction<ProductFormData | null>>;
  currentProduct: ProductFormData | null;
} 

interface AuthProviderProps {
  children: ReactNode;
}

const authContext = createContext({} as AuthContextProps);

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("useAuth debe estar dentro del proveedor AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {

  const [user, setUser] = useState<currentUser | null>(null);
  const [loading, setLoading] = useState(true);

  const [currentProduct, setCurrentProduct] = useState<ProductFormData | null>({} as ProductFormData);

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logout = () => signOut(auth);

  useEffect(() => {
    const unsubuscribe = onAuthStateChanged(auth, (currentUser) => {
      //console.log(currentUser);
      if (currentUser) {
        const { uid, email, displayName, photoURL, emailVerified } = currentUser;
        setUser({ uid, email: email || '', displayName: displayName || '', photoURL: photoURL || '', emailVerified: emailVerified || false });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubuscribe();
  }, []);

  return (
    <authContext.Provider value={{ user, login, logout , loading, setCurrentProduct, currentProduct}}>
      {children}
    </authContext.Provider>
  );
}
