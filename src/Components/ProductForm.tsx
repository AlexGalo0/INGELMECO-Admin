import { useProductForm } from "../hooks/useProductForm";
import { useState, useRef } from "react";

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
  const [marcaError] = useState<string | null>(null);
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isSecondary: boolean = false
  ) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setImageError(null);
      handleImageChange(selectedFile, isSecondary);

      if (isSecondary) {
        setFileSecondary(selectedFile);
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
    if (descripcion.length === 0) {
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

  return (
    <>
      <h1>Agregar Producto</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            <b>Nombre de Producto</b>
          </span>
          <input
            type="text"
            className={`form-control ${nombreError ? "is-invalid" : ""}`}
            placeholder="Nombre de Producto"
            aria-label="Nombre de Producto"
            aria-describedby="basic-addon1"
            value={formData.nombreProducto}
            onChange={handleNombreChange}
            required
          />
          {nombreError && <div className="invalid-feedback">{nombreError}</div>}
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text">
            <b>Categoría</b>
          </span>
          <select
            className={`form-select ${categoriaError ? "is-invalid" : ""}`}
            aria-label="Categoría de Producto"
            value={formData.categoriaProducto}
            onChange={handleCategoriaChange}
            required
          >
            <option value="">Selecciona una Categoría</option>
            <option value="Cables de Control">Cables de Control</option>
            <option value="Cables de Potencia">Cables de Potencia</option>
            <option value="Gabinete">Gabinete</option>
            <option value="Automatización y Control">
              Automatización y Control
            </option>
            <option value="Bancos Capacitores">Bancos Capacitores</option>
            <option value="Distribución">Distribución</option>
            <option value="Energía Solar">Energía Solar</option>
            <option value="Control de Factor y de Potencia">
              Control de Factor y de Potencia
            </option>
            <option value="Arrancador de Estado Sólido">
              Arrancador de Estado Sólido
            </option>
          </select>
          {categoriaError && (
            <div className="invalid-feedback">{categoriaError}</div>
          )}
        </div>
        <div className="mb-3">
          <div className="input-group">
            <span className="input-group-text" id="basic-addon3">
              <b>Subcategoría</b>
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="Subcategoría de Producto"
              aria-describedby="basic-addon3"
              placeholder="Subcategoría de Producto"
              value={formData.subcategoriaProducto}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  subcategoriaProducto: e.target.value,
                })
              }
            />
          </div>
          <div className="form-text" id="basic-addon4">
            Subcategoría no obligatoria
          </div>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text">
            <b>Marca</b>
          </span>
          <select
            className={`form-select ${marcaError ? "is-invalid" : ""}`}
            aria-label="Marca del Producto"
            value={formData.marcaProducto}
            onChange={handleMarcaChange}
            required
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
          {marcaError && <div className="invalid-feedback">{marcaError}</div>}
        </div>

        <div className="input-group">
          <span className="input-group-text">
            <b>Descripción</b>
          </span>
          <textarea
            className={`form-control ${descripcionError ? "is-invalid" : ""}`}
            aria-label="Descripción de Producto"
            placeholder="Descripción de Producto"
            value={formData.descripcionProducto}
            onChange={handleDescripcionChange}
            required
          ></textarea>
          {descripcionError && (
            <div className="invalid-feedback">{descripcionError}</div>
          )}
        </div>
        <div className="input-group mt-3">
          <label className="input-group-text" htmlFor="inputGroupFile">
            <b>Imagen del Producto</b>
          </label>
          <input
            type="file"
            className={`form-control ${imageError ? "is-invalid" : ""}`}
            id="inputGroupFile"
            accept="image/*"
            onChange={(e) => handleFileChange(e)}
            required
            ref={(el) => (secondaryFileInputRef.current = el)}
          />
          {imageError && <div className="invalid-feedback">{imageError}</div>}
        </div>
        {/* Input para la imagen secundaria */}
        <div className="input-group mt-3">
          <label className="input-group-text" htmlFor="inputGroupFileSecondary">
            <b>Imagen Secundaria</b>
          </label>
          <input
            type="file"
            className={`form-control ${imageError ? "is-invalid" : ""}`}
            id="inputGroupFileSecondary"
            accept="image/*"
            onChange={(e) => handleFileChange(e, true)}
            ref={(el) => (fileInputRef.current = el)}
          />
          {imageError && <div className="invalid-feedback">{imageError}</div>}
        </div>
        {/* Input para el archivo PDF */}
        <div className="input-group mt-3">
          <label className="input-group-text" htmlFor="inputGroupFilePDF">
            <b>Archivo PDF (opcional)</b>
          </label>
          <input
            type="file"
            className={`form-control ${pdfError ? "is-invalid" : ""}`}
            id="inputGroupFilePDF"
            accept="application/pdf"
            onChange={(e) => handlePdfChange(e.target.files?.[0])}
            ref={(el) => (pdfInputRef.current = el)}
          />
          {pdfError && <div className="invalid-feedback">{pdfError}</div>}
        </div>
        <div className="mt-3">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isUploading}
          >
            {isUploading ? "Subiendo..." : "Agregar Producto"}
          </button>
        </div>
        {uploadMessage && (
          <div className={`mt-3 ${isUploading ? "text-info" : "text-success"}`}>
            {uploadMessage}
          </div>
        )}
        {successMessageVisible && (
          <div className={`mt-3 text-success`}>Subida Exitosa</div>
        )}
      </form>
    </>
  );
};
