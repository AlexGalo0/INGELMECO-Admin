import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Sidebar = () => {

  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <div className="offcanvas offcanvas-start" tabIndex={-1} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
      <div className="offcanvas-header d-flex align-items-center">
        <img
          className="img-fluid"
          src="../src/assets/logo.png"
          alt="Logo Ingelmeco img"
          style={{ width: "170px" }}
        />
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">

        <div className="">
          <ul className="my-3">
            <li className="my-2 d-flex align-items-center">
              <div className="image-container mr-2">
                <img
                  className="img-icon"
                  src="../src/assets/bienes.png"
                  alt="Ícono de Producto"
                />
              </div>
              {useLocation().pathname === "/admin/products" ? (
                <Link
                  to="/admin/add-product"
                  className="menu-link-bold small-text"
                >
                  Agregar Producto
                </Link>
              ) : (
                <Link to="/admin/products" className="menu-link-bold small-text">
                  Ver Productos
                </Link>
              )}
            </li>
          </ul>
        </div>

        <div className="">
          <img
            className="img-icon"
            src="../src/assets/cerrar-sesion.png"
            alt="Ícono de Cerrar Sesión"
          />
          <button className="menu-link-bold small-text" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </div>
    </div>

  );
};
