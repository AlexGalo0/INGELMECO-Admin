import { Link } from "react-router-dom";

export const Sidebar = () => {
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
          <div>
            <li className="my-2 d-flex align-items-center ">
              <div className="image-container mr-2">
                <img
                  className="img-icon"
                  src="../src/assets/bienes.png"
                  alt="Ícono de Producto"
                />
              </div>
              <Link
                to="/admin/add-product"
                className="menu-link-bold small-text"
                
              >
                Agregar Producto
              </Link>
            </li>
          </div>
        </ul>
      </div>

      <button className="logout-button mb-5">Cerrar Sesión</button>
    </div>
  );
};
