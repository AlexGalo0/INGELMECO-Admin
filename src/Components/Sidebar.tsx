import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Sidebar = () => {

  const { logout, setCurrentProduct } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      setCurrentProduct(null);
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <div className="offcanvas offcanvas-start" tabIndex={-1} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
      <div className="offcanvas-header d-flex align-items-center justify-content-center">

        <button type="button" className="bg-transparent btn border-0" data-bs-dismiss="offcanvas" aria-label="Close">
          <img className="img-fluid" src="../src/assets/logo.png" alt="Logo Ingelmeco" loading="lazy" style={{ width: "170px" }} />
        </button>

      </div>

      <div className="offcanvas-body">

        <ul className="d-flex flex-column justify-content-between" style={{height: '85%'}}>
          <div>

            <li className="my-3 d-flex align-items-center">
              <Link to="/admin/add-product" className="btn bg-transparent text-dark fw-bold border-0">
                <img className="img-fluid mx-2" src="../src/assets/bienes.png" alt="Icono de Producto" style={{ width: "40px" }} loading="lazy" />
                Agregar Producto
              </Link>
            </li>

            <li className="my-3 d-flex align-items-center">
              <Link to="/admin/products" className="btn bg-transparent text-dark fw-bold border-0">
                <img className="img-fluid mx-2" src="../src/assets/bienes.png" alt="Icono de Producto" style={{ width: "40px" }}  loading="lazy"/>
                Ver Productos
              </Link>
            </li>
          </div>

          <div className="">
            <li className="my-3 d-flex align-items-center">
              <button className="btn bg-transparent text-dark fw-bold border-0" onClick={handleLogout}>
                <img className="img-fluid mx-2" src="../src/assets/cerrar-sesion.png" alt="Icono de Cerrar Sesión" style={{ width: "40px" }} loading="lazy"/>
                Cerrar Sesión
              </button>
            </li>
          </div>
        </ul>

      </div>
    </div>
  );
};
