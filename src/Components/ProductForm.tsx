import { useProductForm } from "../hooks/useProductForm";
export const ProductForm = () => {
  const { formData, setFormData, handleSubmit, handleImageChange } = useProductForm();
  

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
            className="form-control"
            placeholder="Nombre de Producto"
            aria-label="Nombre de Producto"
            aria-describedby="basic-addon1"
            value={formData.nombreProducto}
            onChange={(e) =>
              setFormData({
                ...formData,
                nombreProducto: e.target.value,
              })
            }
          />
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
            min={0}
            step={0.01}
            value={formData.precioProducto}
            onChange={(e) =>
              setFormData({
                ...formData,
                precioProducto: parseFloat(e.target.value),
              })
            }
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">
            <b>Categoría</b>
          </span>
          <select
            className="form-select"
            aria-label="Categoría de Producto"
            value={formData.categoriaProducto}
            onChange={(e) =>
              setFormData({
                ...formData,
                categoriaProducto: e.target.value,
              })
            }
          >
            <option value="">Selecciona una Categoría</option>
            <option value="Categoría 1">Categoría 1</option>
            <option value="Categoría 2">Categoría 2</option>
            <option value="Categoría 3">Categoría 3</option>
          </select>
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
            className="form-control"
            aria-label="Descripción de Producto"
            placeholder="Descripción de Producto"
            value={formData.descripcionProducto}
            onChange={(e) =>
              setFormData({
                ...formData,
                descripcionProducto: e.target.value,
              })
            }
          ></textarea>
        </div>
        <div className="input-group mt-3">
          <label className="input-group-text" htmlFor="inputGroupFile">
            <b>Imagen del Producto</b>
          </label>
          <input
            type="file"
            className="form-control"
            id="inputGroupFile"
            accept="image/*"
            onChange={(e) => handleImageChange(e.target.files[0])}
          />
        </div>
        <div className="mt-3">
          <button type="submit" className="btn btn-primary">
            Agregar Producto
          </button>
        </div>
      </form>
    </>
  );
};
