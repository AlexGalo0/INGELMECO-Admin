import { useState } from "react";
import { ProductFormData } from "../types/types";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../config/firebase.js";

export const useProductForm = () => {
  const initialFormData: ProductFormData = {
    nombreProducto: "",
    precioProducto: 0,
    categoriaProducto: "",
    subcategoriaProducto: "",
    descripcionProducto: "",
  };

  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");

  const handleImageChange = (selectedFile: File | null) => {
    setFile(selectedFile);
  };

  const uploadFileToStorage = async (file: File) => {
    const storageRef = ref(storage, `productos/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise<string | null>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (file) {
      try {
        setIsUploading(true);
        setUploadMessage("Subiendo producto...");

        const downloadURL = await uploadFileToStorage(file);

        const docRef = await addDoc(collection(db, "productos"), {
          nombreProducto: formData.nombreProducto,
          precioProducto: formData.precioProducto,
          categoriaProducto: formData.categoriaProducto,
          subcategoriaProducto: formData.subcategoriaProducto,
          descripcionProducto: formData.descripcionProducto,
          urlImagen: downloadURL,
        });
        console.log("Subida Exitosa", docRef.id);
        setIsUploading(false);
        setUploadMessage("");

        // Limpiar el formulario después de la subida exitosa
        setFormData(initialFormData); // Restablecer el estado a los valores iniciales
      } catch (error) {
        console.error("Error al subir la imagen o guardar el producto:", error);
        setUploadMessage("Error al subir el producto.");
        setIsUploading(false);
      }
    } else {
      console.log("Selecciona una imagen antes de enviar el formulario.");
    }
  };

  return {
    formData,
    setFormData,
    handleSubmit,
    handleImageChange,
    isUploading,
    uploadMessage,
  };
};