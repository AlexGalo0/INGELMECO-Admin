export type ImagenProducto = string | ArrayBuffer | null  | File | Blob | undefined ;


export interface ProductFormData {
  nombreProducto: string;
  precioProducto: number;
  categoriaProducto: string;
  subcategoriaProducto: string;
  descripcionProducto: string;
 
}