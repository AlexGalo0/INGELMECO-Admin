import { ReactNode } from "react";

export interface ProductFormData {
  nombreProducto: string;
  categoriaProducto: string;
  subcategoriaProducto: string;
  descripcionProducto: string;
  marcaProducto: string;
  imageName: string;

}

export type User = {
  login: boolean;
};

export type AuthContextType = {
  user: User;
};
export type AuthProviderProps = {
  children: ReactNode;
};