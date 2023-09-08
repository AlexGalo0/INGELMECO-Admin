import { useState } from "react";
import { ProductFormData } from "../types/types";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../config/firebase.js";

export const useProductForm = () => {
  const [formData, setFormData] = useState<ProductFormData>({
    nombreProducto: "",
    precioProducto: 0,
    categoriaProducto: "",
    subcategoriaProducto: "",
    descripcionProducto: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageChange = (selectedFile: File | null) => {
    setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (file) {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("File available at", downloadURL);
          setImageUrl(downloadURL);
          console.log(downloadURL);
          const docRef = await addDoc(collection(db, "productos"), {
            nombreProducto: formData.nombreProducto,
            precioProducto: formData.precioProducto,
            categoriaProducto: formData.categoriaProducto,
            subcategoriaProducto: formData.subcategoriaProducto,
            descripcionProducto: formData.descripcionProducto,
            imagenProducto: downloadURL,
          });
          console.log("Subida Exitosa", docRef.id);
        }
      );
    } else {
      console.log("Selecciona una imagen antes de enviar el formulario.");
    }
  };

  return {
    formData,
    setFormData,
    handleSubmit,
    handleImageChange,
  };
};
