import { useState } from "react";
import { ProductFormData } from "../types/types";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../config/firebase.js";

export const useProductForm = (
  fileInputRef: React.MutableRefObject<HTMLInputElement | null>
) => {
  //Para reestablecer el formulario después de la subida exitosa.
  const initialFormData: ProductFormData = {
    nombreProducto: "",
    precioProducto: 0,
    categoriaProducto: "",
    subcategoriaProducto: "",
    descripcionProducto: "",
  };
  // Para manejar el estado del formulario
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  // Para manejar el estado de la imagen
  const [file, setFile] = useState<File | null>(null);
  // Para manejar el estado de la subida y asi poder mostrar elementos de Uploading...
  const [isUploading, setIsUploading] = useState(false);
  // Para manejar el estado del mensaje de subida, seguramente se remueva en el futuro.
  const [uploadMessage, setUploadMessage] = useState("");
  //Para mostrar un mensaje de exito después de la subida.
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);

  const handleImageChange = (selectedFile: File | null) => {
    setFile(selectedFile);
  };

  const uploadFileToStorage = async (file: File) => {
    //Codigo para subir la imagen a Firebase Storage , retorna la URL de la imagen.
    const storageRef = ref(storage, `productos/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise<string | null>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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

    // Validar que exista una imagen.
    if (file) {
      try {
        setIsUploading(true);
        setUploadMessage("Subiendo producto...");
        // Subir la imagen a Firebase Storage
        const downloadURL = await uploadFileToStorage(file);
        // Subir los datos del producto a Firestore
          await addDoc(collection(db, "productos"), {
          nombreProducto: formData.nombreProducto,
          precioProducto: formData.precioProducto,
          categoriaProducto: formData.categoriaProducto,
          subcategoriaProducto: formData.subcategoriaProducto,
          descripcionProducto: formData.descripcionProducto,
          urlImagen: downloadURL,
        });
        // Limpiar el estado de la subida para los mensajes de error y exito.
        setIsUploading(false);
        setUploadMessage("");
        // Mostrar el mensaje de éxito durante 1 segundo
        setSuccessMessageVisible(true);

        // Ocultar el mensaje de éxito después de 1 segundo
        setTimeout(() => {
          setSuccessMessageVisible(false);
        }, 1000); // 1000 milisegundos = 1 segundo
        // Limpiar el formulario después de la subida exitosa
        setFormData(initialFormData); // Restablecer el estado a los valores iniciales
        fileInputRef.current.value = null; // Limpiar el input de imagen
      } catch (error) {
        setUploadMessage("Error al subir el producto.");
        setIsUploading(false);
      }
    }
  };

  return {
    formData,
    setFormData,
    handleSubmit,
    handleImageChange,
    isUploading,
    uploadMessage,
    successMessageVisible,
  };
  
};
