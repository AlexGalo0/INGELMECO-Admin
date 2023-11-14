import { AdminForm } from "../Components/AdminForm";

export const LoginAdmin = () => {

  return (
    <div className="container-login">
      <div className="container px-xl-5">
        <section id="formHolder">
          <div className="row">
            <div className="col-sm-6 brand d-xxl-block d-xl-block d-lg-block d-md-block d-sm-none d-block">
              <div className="heading">
                <img
                  className="w-75 pb-lg-5 pb-xl-5 pb-md-3 pb-sm-2 pb-2 img-fluid"
                  src="src\assets\undraw_forgot_password_re_hxwm.svg"
                  alt="inicio sesión img"
                  loading="lazy"
                />
                <h2 className="">Inicio de sesión</h2>
              </div>
            </div>
            <AdminForm />
          </div>
        </section>
      </div>
    </div>
  );
};
