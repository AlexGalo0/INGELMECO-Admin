import { useState } from "react";
import { ProductFormData } from "../types/types";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../config/firebase.js";

export const useProductForm = (
  fileInputRef: React.MutableRefObject<HTMLInputElement | null>,
  secondaryFileInputRef: React.MutableRefObject<HTMLInputElement | null>,
  pdfInputRef: React.MutableRefObject<HTMLInputElement | null>
) => {
  const initialFormData: ProductFormData = {
    nombreProducto: "",
    categoriaProducto: "",
    subcategoriaProducto: "",
    descripcionProducto: "",
    marcaProducto: "",
    id: "",
    imageName: "",
    imageNameSecondary: "",
    pdfName: "",
    urlImagen: "",
    urlImagenSecundaria: "",
  };

  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [file, setFile] = useState<File | null>(null);
  const [fileSecondary, setFileSecondary] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null); // Nuevo estado para el archivo PDF
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null); // Nuevo estado para errores del PDF

  const handleImageChange = (
    selectedFile: File | null,
    isSecondary: boolean = false
  ) => {
    if (isSecondary) {
      setFileSecondary(selectedFile);
    } else {
      setFile(selectedFile);
    }
  };

  const uploadFileToStorage = async (
    file: File,
    isSecondary: boolean = false
  ) => {
    const fileName = isSecondary ? `${file.name}` : file.name;
    const storageRef = ref(storage, `productos/${fileName}`);
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

  const uploadPdfToStorage = async (pdf: File) => {
    try {
      const fileName = `${pdf.name}`;
      const storageRef = ref(storage, `pdfs/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, pdf);

      return new Promise<string | null>((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("PDF Upload is " + progress + "% done");
          },
          (error) => {
            console.log(error);
            reject(error);
          },
          async () => {
            const pdfDownloadURL = await getDownloadURL(
              uploadTask.snapshot.ref
            );
            resolve(pdfDownloadURL);
          }
        );
      });
    } catch (error) {
      console.error("Error al cargar el archivo PDF", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (file) {
      try {
        const imageName = file.name;
        setIsUploading(true);
        setUploadMessage("Subiendo producto...");

        const downloadURL = await uploadFileToStorage(file);
        const productData = {
          nombreProducto: formData.nombreProducto,
          categoriaProducto: formData.categoriaProducto,
          subcategoriaProducto: formData.subcategoriaProducto,
          descripcionProducto: formData.descripcionProducto,
          urlImagen: downloadURL,
          marcaProducto: formData.marcaProducto,
          imageName: imageName,
          urlImagenSecundaria: null as string | null,
          imageNameSecondary: null as string | null,
          pdfName: null as string | null,
          urlPdf: null as string | null,
        };

        if (fileSecondary) {
          const downloadURLSecondary = await uploadFileToStorage(
            fileSecondary,
            true
          );
          productData.urlImagenSecundaria = downloadURLSecondary;
          productData.imageNameSecondary = fileSecondary.name;
        }

        // Manejar el archivo PDF si existe
        if (pdfFile) {
          const pdfDownloadURL = await uploadPdfToStorage(pdfFile);
          productData.urlPdf = pdfDownloadURL;
          productData.pdfName = pdfFile.name;
        }

        await addDoc(collection(db, "productos"), productData);
        setIsUploading(false);
        setUploadMessage("");
        setSuccessMessageVisible(true);

        setTimeout(() => {
          setSuccessMessageVisible(false);
        }, 1000);
        setFormData(initialFormData);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        if (secondaryFileInputRef.current) {
          secondaryFileInputRef.current.value = "";
        }

        if (pdfInputRef.current) {
          pdfInputRef.current.value = "";
        }
        setFileSecondary(null);
        setPdfFile(null); // Limpiar el estado del archivo PDF
      } catch (error) {
        console.log(error);
        setUploadMessage("Error al subir el producto.");
        setIsUploading(false);
      }
    }
  };

  const handlePdfChange = (selectedPdf: File | null) => {
    if (selectedPdf) {
      setPdfError(null);
      setPdfFile(selectedPdf);
    }
  };

  return {
    formData,
    setFormData,
    handleSubmit,
    handleImageChange,
    handlePdfChange,
    isUploading,
    uploadMessage,
    successMessageVisible,
    pdfFile,
    pdfError,
  };
};
