import { AdminForm } from "../Components/AdminForm";

export const LoginAdmin = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="h-50 ms-auto bg-primary d-flex flex-column justify-content-center align-items-center">
        <img className="h-50" src="src\assets\undraw_forgot_password_re_hxwm.svg.svg" alt="Inicio de Sesión img" />
        <h1 className="">Iniciar Sesión</h1>
      </div>
      <AdminForm />
    </div>
  );
};
