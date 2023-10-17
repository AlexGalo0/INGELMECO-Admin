import { useEffect, useState } from "react";
import { ProductFormData } from "../types/types";
import { db } from "../config/firebase.js";
import { collection, getDocs } from "firebase/firestore";

export const useProductFetch = () => {
  const [productos, setProductos] = useState<ProductFormData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "productos"));
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProductos(newData);
 
      setLoading(false);
    } catch (error) {
      // Maneja errores aquí si es necesario
      console.error("Error al obtener productos:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { productos, loading , fetchProducts };
};
