import { Link, useLocation   } from "react-router-dom";
import { useEffect  , useState} from "react";
export const Sidebar = () => {
const [] = useState(false)
  return (
    <div className="sidebar d-flex flex-column">
      <div className="image-container pt-5">
        <img
          className="img-fluid"
          src="../src/assets/logo.png"
          alt="Logo Ingemeco img"
        />
      </div>

      <div className="sidebar-menu pt-5 flex-grow-1 text-center">
        <ul className="my-3">
          <li className="my-2 d-flex align-items-center">
            <div className="image-container mr-2">
              <img
                className="img-icon"
                src="../src/assets/bienes.png"
                alt="Ícono de Producto"
              />
            </div>
            {
              useLocation().pathname === "/admin/products" ? (
                <Link to="/admin/add-product" className="menu-link-bold small-text">
                 Agregar Producto
              </Link>
              ) : (
                <Link to="/admin/products" className="menu-link-bold small-text">
                  Ver Productos
                </Link>
              )
            }
           
          </li>
        </ul>
      </div>

      <div className="sidebar-menu pb-5 text-center">
        <ul className="my-3">
          <li className="d-flex align-items-center">
            <div className="image-container ">
              <img
                className="img-icon"
                src="../src/assets/cerrar-sesion.png"
                alt="Ícono de Cerrar Sesión"
              />
            </div>
            <span className="menu-link-bold small-text">Cerrar Sesión</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
