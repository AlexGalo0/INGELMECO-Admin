import { AdminForm } from "../Components/AdminForm";

export const LoginAdmin = () => {

  return (
    <div className="container-login">
      <div className="container">
        <section id="formHolder">
          <div className="row">
            <div className="col-sm-6 brand">
              <div className="heading">
                <img
                  className="w-100 pb-5 img-fluid"
                  src="src\assets\undraw_forgot_password_re_hxwm.svg.svg"
                  alt="inicio sesión img"
                />
                <h2>Inicio de sesión</h2>
              </div>
            </div>
            <AdminForm />
          </div>
        </section>
      </div>
    </div>
  );
};
