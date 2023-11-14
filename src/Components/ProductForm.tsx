import { useProductForm } from "../hooks/useProductForm";
import { useState, useRef, useEffect } from "react";
import { Alerts } from "../Components/Alerts.tsx";
import { useAuth } from "../context/AuthContext.tsx"
import { collection, deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "../config/firebase.ts";
import { useNavigate } from 'react-router-dom';

export const ProductForm = () => {

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const secondaryFileInputRef = useRef<HTMLInputElement | null>(null);
  const pdfInputRef = useRef<HTMLInputElement | null>(null); // Referencia al input de PDF
  const { currentProduct, setCurrentProduct } = useAuth();
  const navigate = useNavigate();

  const {
    formData,
    setFormData,
    handleSubmit,
    handleImageChange,
    handlePdfChange, // Manejo del cambio de PDF
    isUploading,
    uploadMessage,
    successMessageVisible,
    pdfError, // Estado de errores del PDF
  } = useProductForm(fileInputRef, secondaryFileInputRef, pdfInputRef);

  const [imageError, setImageError] = useState<string | null>(null);
  const [nombreError, setNombreError] = useState<string | null>(null);
  const [descripcionError, setDescripcionError] = useState<string | null>(null);
  const [categoriaError, setCategoriaError] = useState<string | null>(null);
  const [fileSecondary, setFileSecondary] = useState<File | null>(null);
  const [marcaError, setMarcaError] = useState<string | null>(null);

  const [imagePrimary, setImagePrimary] = useState<File | null>(null);
  const [imageSecondary, setImageSecondary] = useState<File | null>(null);
  const [imageUrlPrimary, setImageUrlPrimary] = useState<string | null>(null);
  const [imageUrlSecondary, setImageUrlSecondary] = useState<string | null>(null);

  const [mode, setMode] = useState<"add" | "edit">("add");

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isSecondary: boolean = false
  ) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setImageError(null);
      handleImageChange(selectedFile, isSecondary);

      if (!isSecondary) {
        setImagePrimary(selectedFile);
      }
      if (isSecondary) {
        setFileSecondary(selectedFile);
        setImageSecondary(selectedFile);
      }
    } else {
      setImageError("Selecciona una imagen");
    }
  };

  const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nombre = e.target.value;
    if (nombre.length === 0) {
      setNombreError("El nombre no puede estar vacío");
    } else if (nombre.length < 3 || nombre.length > 50) {
      setNombreError("El nombre debe tener entre 3 y 50 caracteres");
    } else {
      setNombreError(null);
    }
    setFormData({
      ...formData,
      nombreProducto: nombre,
    });
  };

  const handleDescripcionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const descripcion = e.target.value;
    if (descripcion.trim().length === 0) {
      setDescripcionError("La descripción no puede estar vacía");
    } else {
      setDescripcionError(null);
    }
    setFormData({
      ...formData,
      descripcionProducto: descripcion,
    });
  };

  const handleMarcaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const marca = e.target.value;
    if (!marca) {
      setMarcaError("Selecciona una marca");
    } else {
      setMarcaError(null);
    }
    setFormData({
      ...formData,
      marcaProducto: marca,
    });
  };

  const handleCategoriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoria = e.target.value;
    if (!categoria) {
      setCategoriaError("Selecciona una categoría");
    } else {
      setCategoriaError(null);
    }
    setFormData({
      ...formData,
      categoriaProducto: categoria,
    });
  };

  const handleRemoveImagePrimary = () => {
    if (imagePrimary) {
      setImagePrimary(null);
    }
  };

  const handleRemoveImageSecondary = () => {
    if (imageSecondary) {
      setImageSecondary(null);
    }
  };

  if (successMessageVisible) {
    handleRemoveImagePrimary();
    handleRemoveImageSecondary();
  }

  const handleDelete = async (
    id: string,
    imageName: string,
    imageSecondaryName: string,
    pdfName: string
  ) => {
    try {
      // Elimina el documento de Firestore por su ID
      await deleteDoc(doc(collection(db, "productos"), id));
      // Elimina la imagen del storage
      await deleteObject(ref(storage, `productos/${imageName}`));
      if (imageSecondaryName) {
        await deleteObject(ref(storage, `productos/${imageSecondaryName}`));
      }
      if (pdfName) {
        await deleteObject(ref(storage, `pdfs/${pdfName}`));
      }
    } catch (error) {
      console.error("Error al borrar el producto:", error);
    } finally {
      navigate("/admin/products");
    }
  };

  useEffect(() => {
    (!currentProduct) ? setCurrentProduct(null) : setFormData(currentProduct);
    if (currentProduct && (currentProduct.imageName || currentProduct.imageNameSecondary)) {
      setImageUrlPrimary(currentProduct.urlImagen);
      setImageUrlSecondary(currentProduct.urlImagenSecundaria);
      setMode("edit");
    }
  }, [currentProduct, setCurrentProduct, setFormData, fileSecondary]);

  return (
    <div className="d-grid h-75">
      <div className="m-4 rounded-4 h-auto" style={{ backgroundColor: "#DDD" }}>
        <p className="fw-bold text-black fs-3 m-0 pt-3 px-xxl-5 px-xl-5 px-lg-3 px-md-3 px-sm-2 px-1">
          Registrar producto
        </p>

        <form onSubmit={handleSubmit} className="px-xxl-5 px-xl-5 px-lg-3 px-md-3 px-sm-2 px-1 pb-4 h-100">
          <div className="container">
            <div className="row">
              {/* Primera columna*/}
              <div className="col-xxl-6 col-xl-6 col-lg-6">

                {/*Nombre*/}
                <div className="form__group field my-3">
                  <input
                    type="text"
                    id="NameProduct"
                    value={formData?.nombreProducto ?? ""}
                    onChange={handleNombreChange}
                    className={`form__field ${nombreError ? "is-invalid" : ""}`}
                    placeholder="Nombre del Producto"
                    aria-label="Nombre del Producto"
                    required
                    style={{ color: "#048c88" }}
                  />
                  <label htmlFor="NameProduct" className="form__label">
                    Nombre del Producto
                  </label>
                  {nombreError && (
                    <div className="invalid-feedback">{nombreError}</div>
                  )}
                </div>

                {/*Categoría*/}
                <div className="form__group field my-3">
                  <select
                    id="CategorieProduct"
                    onChange={handleCategoriaChange}
                    value={formData?.categoriaProducto ?? ""}
                    className={`form__field ${categoriaError ? "is-invalid" : ""
                      }`}
                    placeholder="Categoría del Producto"
                    aria-label="Categoría del Producto"
                    required
                    style={{ color: "#048c88" }}
                  >
                    <option value="">Selecciona una Categoría</option>
                    <option value="Cables de Control">Cables de Control</option>
                    <option value="Cables de Potencia">
                      Cables de Potencia
                    </option>
                    <option value="Gabinete">Gabinete</option>
                    <option value="Automatización y Control">
                      Automatización y Control
                    </option>
                    <option value="Bancos Capacitores">
                      Bancos Capacitores
                    </option>
                    <option value="Distribución">Distribución</option>
                    <option value="Energía Solar">Energía Solar</option>
                    <option value="Control de Factor y de Potencia">
                      Control de Factor y de Potencia
                    </option>
                    <option value="Arrancador de Estado Sólido">
                      Arrancador de Estado Sólido
                    </option>
                  </select>

                  <label htmlFor="CategorieProduct" className="form__label">
                    Categoría
                  </label>
                  {categoriaError && (
                    <div className="invalid-feedback">{categoriaError}</div>
                  )}
                </div>

                {/*Subcategoría*/}
                <div className="form__group field my-3">
                  <input
                    type="text"
                    id="SubCategorieProduct"
                    value={formData?.subcategoriaProducto ?? ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        subcategoriaProducto: e.target.value,
                      })
                    }
                    className="form__field"
                    placeholder="Subcategoría de Producto"
                    aria-label="Subcategoría de Producto"
                    style={{ color: "#048c88" }}
                  />
                  <label htmlFor="SubCategorieProduct" className="form__label">
                    Subcategoría
                  </label>
                  <div className="form-text" id="basic-addon4">
                    Subcategoría no obligatoria
                  </div>
                </div>

                {/*Marca*/}
                <div className="form__group field my-3">
                  <select
                    id="MarcaProduct"
                    onChange={handleMarcaChange}
                    value={formData?.marcaProducto ?? ""}
                    className={`form__field ${marcaError ? "is-invalid" : ""}`}
                    placeholder="Marca del Producto"
                    aria-label="Marca del Producto"
                    required
                    style={{ color: "#048c88" }}
                  >
                    <option value="">Selecciona una Marca</option>
                    <option value="SIEMENS">SIEMENS</option>
                    <option value="ABB">ABB</option>
                    <option value="Electronicon">Electronicon</option>
                    <option value="SIBA">SIBA</option>
                    <option value="Selec">Selec</option>
                    <option value="DataKom">DataKom</option>
                    <option value="Little Fuse">Little Fuse</option>
                    <option value="Otra Marca">Otra Marca</option>
                  </select>
                  <label htmlFor="MarcaProduct" className="form__label">
                    Marca
                  </label>
                  {marcaError && (<div className="invalid-feedback">{marcaError}</div>)}
                </div>

                {/*Descripción*/}
                <div className="form__group field my-3">
                  <textarea
                    className={`form__field ${descripcionError ? "is-invalid" : ""}`}
                    aria-label="Descripción de Producto"
                    placeholder="Descripción de Producto"
                    value={formData?.descripcionProducto ?? ""}
                    onChange={handleDescripcionChange}
                    style={{ color: "#048c88" }}
                    required
                  ></textarea>
                  <label htmlFor="CategorieProduct" className="form__label">
                    Descripción
                  </label>
                  {descripcionError && (<div className="invalid-feedback">{descripcionError}</div>)}
                </div>
              </div>
              {/* Fin Primera columna*/}

              {/* Segunda columna*/}
              <div className="col-xxl-6 col-xl-6 col-lg-6">
                <div className="d-xxl-flex d-xl-flex d-lg-flex d-md-flex d-grid justify-content-around">
                  {(!imagePrimary && !imageUrlPrimary) && (
                    <div className="m-3 d-flex justify-content-center">
                      <label
                        className="d-flex flex-column gap-4 align-items-center justify-content-center p-3 rounded-4"
                        style={{ height: "200px", width: "200px", cursor: "pointer", backgroundColor: "#202020" }}
                        htmlFor="inputGroupFile"
                      >
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <img className="h-50 img-fluid" src="/assets/img.png" alt="img" />
                          <span style={{ fontWeight: "400", color: "#FFF" }}>
                            Click para subir imagen
                          </span>
                        </div>
                        <input
                          type="file"
                          className={`bg-transparent ${imageError ? "is-invalid" : ""}`} // d-none
                          id="inputGroupFile"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e)}
                          required
                          //ref={(el) => (secondaryFileInputRef.current = el)}
                          ref={(el) => (fileInputRef.current = el)}
                        />
                        {/* <div className="text-danger bg-black">Error al subir imagen</div> */}
                        {imageError && (
                          <div className="text-danger bg-black">dsfd{imageError}</div>
                        )}
                      </label>
                    </div>
                  )}

                  {(imagePrimary || imageUrlPrimary) && (
                    <div className="m-3 d-flex justify-content-center">
                      <label
                        className="d-flex flex-column gap-4 align-items-center justify-content-center p-3 rounded-4"
                        style={{
                          height: "200px",
                          width: "200px",
                          cursor: "pointer",
                          backgroundColor: "#202020",
                        }}
                        htmlFor="viewImg"
                      >
                        <div className="d-flex flex-column justify-content-between align-items-center h-100">
                          {imagePrimary && (
                            <img
                              className="w-50 img-fluid"
                              src={URL.createObjectURL(imagePrimary)}
                              alt="img"
                            />
                          )}

                          {imageUrlPrimary && (
                            <img
                              className="w-50 img-fluid"
                              src={imageUrlPrimary}
                              alt="img"
                            />
                          )}

                          <button
                            onClick={handleRemoveImagePrimary}
                            className="btn btn-danger mt-3"
                          >
                            Eliminar
                          </button>
                        </div>
                      </label>
                    </div>
                  )}

                  {(!imageSecondary && !imageUrlSecondary) && (
                    <div className="m-3 d-flex flex-column justify-content-center align-items-center">
                      <label
                        className="d-flex flex-column gap-4 align-items-center justify-content-center p-3 rounded-4"
                        style={{
                          height: "200px",
                          width: "200px",
                          cursor: "pointer",
                          backgroundColor: "#202020",
                        }}
                        htmlFor="inputGroupFileSecondary"
                      >
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <img
                            className="h-50 img-fluid "
                            src="/assets/img.png"
                            alt="img"
                          />
                          <span style={{ fontWeight: "400", color: "#FFF" }}>
                            Click para subir imagen
                          </span>
                        </div>
                        <input
                          type="file"
                          className={`bg-transparent ${imageError ? "is-invalid" : ""}`}// d-none
                          id="inputGroupFileSecondary"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, true)}
                          // ref={(el) => (fileInputRef.current = el)}
                          ref={(el) => (secondaryFileInputRef.current = el)}
                        />
                      </label>
                      {imageError && (
                        <div className="">{imageError}</div>
                      )}
                      <div className="form-text" id="basic-addon4">
                        Imagen Secundaria no obligatoria
                      </div>
                    </div>
                  )}

                  {(imageSecondary || imageUrlSecondary) && (
                    <div className="m-3 d-flex flex-column justify-content-center align-items-center">
                      <label
                        className="d-flex flex-column gap-4 align-items-center justify-content-center p-3 rounded-4"
                        style={{
                          height: "200px",
                          width: "200px",
                          cursor: "pointer",
                          backgroundColor: "#202020",
                        }}
                        htmlFor="viewimg2"
                      >
                        <div className="d-flex flex-column justify-content-between align-items-center h-100">
                          {
                            imageSecondary && (
                              <img
                                className="w-50 img-fluid"
                                src={URL.createObjectURL(imageSecondary)}
                                alt="img"
                              />
                            )
                          }
                          {
                            imageUrlSecondary && (
                              <img
                                className="w-50 img-fluid"
                                src={imageUrlSecondary}
                                alt="img"
                              />
                            )
                          }
                          <button
                            onClick={handleRemoveImageSecondary}
                            className="btn btn-danger mt-3"
                          >
                            Eliminar
                          </button>
                        </div>
                      </label>
                      <div className="form-text" id="basic-addon4">
                        Imagen Secundaria no obligatoria
                      </div>
                    </div>
                  )}
                </div>

                <div className="form__group field my-3 ">
                  <input
                    type="file"
                    className={`form-control ${pdfError ? "is-invalid" : ""}`}
                    id="inputGroupFilePDF"
                    accept="application/pdf"
                    onChange={(e) => handlePdfChange(e.target.files?.[0] ?? null)}
                    ref={(el) => (pdfInputRef.current = el)}
                    style={{ color: "#048c88" }}
                  />
                  <label htmlFor="inputGroupFilePDF" className="form__label form-label">
                    Archivo PDF
                  </label>
                  {pdfError && <div className="invalid-feedback">{pdfError}</div>}
                </div>
                <div className="form-text" id="basic-addon4">
                  Archivo PDF no obligatorio
                </div>
              </div>
              {/* Fin Segunda columna*/}
            </div>
          </div>

          <div className={`mt-xxl-5 mt-xl-5 mt-lg-5 mt-md-4 mt-sm-2 mt-3 d-flex justify-content-around align-items-center ${uploadMessage ? "d-none" : ""}`}>
            {
              mode === "edit" && (
                <button
                  onClick={() =>
                    handleDelete(
                      currentProduct?.id ?? "",
                      currentProduct?.imageName ?? "",
                      currentProduct?.imageNameSecondary ?? "",
                      currentProduct?.pdfName ?? ""
                    )
                  }
                  id="bottone5"
                  className=" justify-content-around"
                >
                  Borrar
                </button>
              )
            }

            {
              mode !== "edit" && (
                <button id="bottone5" type="submit" disabled={isUploading}>
                  {isUploading ? "Subiendo..." : "Agregar Producto"}
                </button>
              )
            }
          </div>

          {uploadMessage && (
            <div className="d-flex justify-content-center m-5">
              <div className="spinner">
                <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
              </div>
            </div>
          )}

          {successMessageVisible && (
            <div className="d-flex justify-content-center m-3">
              <Alerts
                message="Éxito"
                message2="Se ha agregado el producto correctamente"
                type="alert-success"
                svg={<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#ffffff" d="m9 20.42l-6.21-6.21l2.83-2.83L9 14.77l9.88-9.89l2.83 2.83L9 20.42Z" /></svg>}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
