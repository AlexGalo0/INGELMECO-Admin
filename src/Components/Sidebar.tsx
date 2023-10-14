export const Sidebar = () => {
    return (
      <div className="sidebar">
        <div className="logo">INGELMECO</div>
          <div className="sidebar-menu">
              <ul>
              <li>
                  <a href="/admin/add-product">Agregar Producto</a>
              </li>
              <li>
                  <a href="/admin/products">Productos</a>
              </li>
              </ul>
        <button className="logout-button">Cerrar Sesión</button>
        </div>
      </div>
    );
  };