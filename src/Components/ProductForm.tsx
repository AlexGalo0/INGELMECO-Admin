import { useProductForm } from "../hooks/useProductForm";
import { useState, useRef } from "react";

export const ProductForm = () => {
  // Ref necesario para la limpieza de la imagen después de la subida exitosa.
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const {
    formData,
    setFormData,
    handleImageChange,
    handleSubmit,
    isUploading,
    uploadMessage,
  } = useProductForm(fileInputRef);
  const [imageError, setImageError] = useState<string | null>(null);
  const [nombreError, setNombreError] = useState<string | null>(null);
  const [descripcionError, setDescripcionError] = useState<string | null>(null);
  const [categoriaError, setCategoriaError] = useState<string | null>(null);

  /* Las siguientes funciones son unicamente manejadores para validaciones de formulario. */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setImageError(null);
      handleImageChange(selectedFile);
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
            <b>L.</b>
          </span>
          <input
            type="number"
            className="form-control"
            placeholder="Precio de Producto"
            aria-label="Precio de Producto"
            aria-describedby="basic-addon2"
            min={0.1} // Cambiado para evitar que el precio sea 0
            step={0.01}
            value={formData.precioProducto}
            onChange={(e) =>
              setFormData({
                ...formData,
                precioProducto: parseFloat(e.target.value),
              })
            }
            required
          />
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
            onChange={handleFileChange}
            required
            ref={(el) => (fileInputRef.current = el)}
          />

          {imageError && <div className="invalid-feedback">{imageError}</div>}
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
      </form>
    </>
  );
};
