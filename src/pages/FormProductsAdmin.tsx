import { Outlet } from "react-router-dom";
import { Sidebar } from "../Components";

export const FormProductsAdmin = () => {

  return (
    <div className="container-fluid vh-100">
      <div className="p-2">
        <button className="bg-transparent border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
          <img
            className="img-fluid"
            src="/assets/logo.png"
            alt="Logo Ingelmeco img"
            style={{ width: "170px" }}
            loading="lazy"
          />
        </button>
      </div>
      <Sidebar />
      <Outlet />
    </div>
  );
};
