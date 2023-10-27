import { useProductForm } from "../hooks/useProductForm";
import { useState, useRef, useEffect } from "react";

export const ProductForm = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const secondaryFileInputRef = useRef<HTMLInputElement | null>(null);
  const pdfInputRef = useRef<HTMLInputElement | null>(null); // Referencia al input de PDF
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

      setTimeout(() => {
        setShowDescripcion(!showDescripcion);
      }, 3000);
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
      setShowMarca(false);
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
      setShowCategories(false);
    } else {
      setCategoriaError(null);
    }
    setFormData({
      ...formData,
      categoriaProducto: categoria,
    });
  };

  const [showCategories, setShowCategories] = useState<boolean>(false);
  const [showMarca, setShowMarca] = useState<boolean>(false);
  const [showDescripcion, setShowDescripcion] = useState<boolean>(false);

  const handleShowCategories = () => {
    setShowCategories(!showCategories);
  };

  const handleShowMarca = () => {
    setShowMarca(!showMarca);
  };

  const handleShowDescripcion = () => {
    setShowDescripcion(!showDescripcion);
  };

  useEffect(() => { }, [fileSecondary]);

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

  if(successMessageVisible) {
    handleRemoveImagePrimary();
    handleRemoveImageSecondary();
  }
  
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
                <div className="form__group field my-3">
                  <input
                    type="text"
                    id="NameProduct"
                    value={formData.nombreProducto}
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

                <div className="form__group field my-3">
                  {showCategories ? (
                    <select
                      id="CategorieProduct"
                      onChange={handleCategoriaChange}
                      value={formData.categoriaProducto}
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
                  ) : (
                    <input
                      type="text"
                      id="CategorieProduct"
                      onClick={handleShowCategories}
                      className={`form__field ${showCategories ? "d-none" : ""}`}
                      placeholder="Categoría del Producto"
                      required
                      aria-label="Categoría del Producto"
                      style={{ color: "#048c88" }}
                    />
                  )}
                  <label htmlFor="CategorieProduct" className="form__label">
                    Categoría
                  </label>
                  {categoriaError && (
                    <div className="invalid-feedback">{categoriaError}</div>
                  )}
                </div>

                <div className="form__group field my-3">
                  <input
                    type="text"
                    id="SubCategorieProduct"
                    value={formData.subcategoriaProducto}
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

                <div className="form__group field my-3">
                  {showMarca ? (
                    <select
                      id="MarcaProduct"
                      onChange={handleMarcaChange}
                      value={formData.marcaProducto}
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
                  ) : (
                    <input
                      type="text"
                      id="CategorieProduct"
                      onClick={handleShowMarca}
                      className={`form__field ${showMarca ? "d-none" : ""}`}
                      placeholder="Marca del Producto"
                      aria-label="Marca del Producto"
                      style={{ color: "#048c88" }}
                    />
                  )}
                  <label htmlFor="MarcaProduct" className="form__label">
                    Marca
                  </label>
                  {marcaError && (
                    <div className="invalid-feedback">{marcaError}</div>
                  )}
                </div>

                <div className="form__group field my-3">
                  {showDescripcion ? (
                    <textarea
                      className={`form__field ${descripcionError ? "is-invalid" : ""
                        }`}
                      aria-label="Descripción de Producto"
                      placeholder="Descripción de Producto"
                      value={formData.descripcionProducto}
                      onChange={handleDescripcionChange}
                      style={{ color: "#048c88" }}
                      required
                    ></textarea>
                  ) : (
                    <input
                      type="text"
                      id="DescriptionProduct"
                      onClick={handleShowDescripcion}
                      className={`form__field ${showDescripcion ? "d-none" : ""}`}
                      placeholder="Descripción del Producto"
                      aria-label="Descripción del Producto"
                      style={{ color: "#048c88" }}
                    />
                  )}
                  <label htmlFor="CategorieProduct" className="form__label">
                    Descripción
                  </label>
                  {descripcionError && (
                    <div className="invalid-feedback">{descripcionError}</div>
                  )}
                </div>
              </div>
              {/* Fin Primera columna*/}

              {/* Segunda columna*/}
              <div className="col-xxl-6 col-xl-6 col-lg-6">
                <div className="d-xxl-flex d-xl-flex d-lg-flex d-md-flex d-grid justify-content-around">
                  {!imagePrimary && (
                    <div className="m-3 d-flex justify-content-center">
                      <label
                        className="d-flex flex-column gap-4 align-items-center justify-content-center p-3 rounded-4"
                        style={{
                          height: "200px",
                          width: "200px",
                          cursor: "pointer",
                          backgroundColor: "#202020",
                        }}
                        htmlFor="inputGroupFile"
                      >
                        <div className="d-flex flex-column align-items-center justify-content-center">
                          <img
                            className="h-50 img-fluid"
                            src="../src/assets/img.png"
                            alt="img"
                          />
                          <span style={{ fontWeight: "400", color: "#FFF" }}>
                            Click para subir imagen
                          </span>
                        </div>
                        <input
                          type="file"
                          className={`d-none ${imageError ? "is-invalid" : ""}`}
                          id="inputGroupFile"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e)}
                          required
                          ref={(el) => (secondaryFileInputRef.current = el)}
                        />
                      </label>
                      {imageError && (
                        <div className="invalid-feedback">{imageError}</div>
                      )}
                    </div>
                  )}
                  {imagePrimary && (
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
                          <img
                            className="w-50 img-fluid"
                            src={URL.createObjectURL(imagePrimary)}
                            alt="img"
                          />
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

                  {!imageSecondary && (
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
                            className="h-50 img-fluid"
                            src="../src/assets/img.png"
                            alt="img"
                          />
                          <span style={{ fontWeight: "400", color: "#FFF" }}>
                            Click para subir imagen
                          </span>
                        </div>
                        <input
                          type="file"
                          className={`d-none ${imageError ? "is-invalid" : ""}`}
                          id="inputGroupFileSecondary"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, true)}
                          ref={(el) => (fileInputRef.current = el)}
                        />
                      </label>
                      {imageError && (
                        <div className="invalid-feedback">{imageError}</div>
                      )}
                      <div className="form-text" id="basic-addon4">
                        Imagen Secundaria no obligatoria
                      </div>
                    </div>
                  )}

                  {imageSecondary && (
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
                          <img
                            className="h-50 img-fluid"
                            src={URL.createObjectURL(imageSecondary)}
                            alt="img"
                          />
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
                  <label
                    htmlFor="inputGroupFilePDF"
                    className="form__label form-label"
                  >
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

          <div className="mt-xxl-5 mt-xl-5 mt-lg-5 mt-md-4 mt-sm-2 mt-3 d-flex justify-content-center align-items-center">
            <button id="bottone5" type="submit" disabled={isUploading}>
              {isUploading ? "Subiendo..." : "Agregar Producto"}
            </button>
          </div>


          {uploadMessage && (
            <div className="text-center">
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}

          {successMessageVisible && (
            <div className={`mt-3 text-success`}>Subida Exitosa</div>
          )}
        </form>
      </div>
    </div>
  );
};
