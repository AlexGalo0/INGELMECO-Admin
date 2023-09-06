import { useState } from "react";
import { ProductFormData } from "../types/types";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase.js";
export const useProductForm = () => {
  const [formData, setFormData] = useState<ProductFormData>({
    nombreProducto: "",
    precioProducto: 0,
    categoriaProducto: "",
    subcategoriaProducto: "",
    descripcionProducto: "",
  });

  const uploadToFirebase = async () => {
    try {
      const docRef = await addDoc(collection(db, "productos"), {
        nombreProducto: formData.nombreProducto,
        precioProducto: formData.precioProducto,
        categoriaProducto: formData.categoriaProducto,
        subcategoriaProducto: formData.subcategoriaProducto,
        descripcionProducto: formData.descripcionProducto,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    uploadToFirebase();
    // console.log(formData);
  };

  return {
    formData,
    setFormData,
    handleSubmit,
  };
};
