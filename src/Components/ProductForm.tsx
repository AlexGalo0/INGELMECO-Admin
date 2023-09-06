export const ProductForm = () => {
  return (
    <>
      <h1>Agrega Producto</h1>
      <form>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            <b>Nombre de Producto</b>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Nombre de Producto"
            aria-label="Username"
            aria-describedby="basic-addon1"
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
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            min={0}
            step={0.01}
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text">
            <b>Categoría</b>
          </span>
          <select className="form-select" aria-label="Default select example">
            <option selected>Selecciona una Categoría</option>
            <option value="1">Categoría 1</option>
            <option value="2">Categoría 2</option>
            <option value="3">Categoría 3</option>
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
              id="basic-url"
              aria-describedby="basic-addon3 basic-addon4"
            />
          </div>
          <div className="form-text" id="basic-addon4">
            Subcategoria no obligatoria
          </div>
        </div>
        <div className="input-group">
          <span className="input-group-text">
            <b>Descripción</b>
          </span>
          <textarea
            className="form-control"
            aria-label="With textarea"
            placeholder="Descripción de Producto"
          ></textarea>
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
