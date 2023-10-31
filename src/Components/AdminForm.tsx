import { auth } from "../config/firebase.ts";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAdminForm } from "../hooks/useAdminForm.tsx";
import { Alerts } from "./Alerts.tsx";

export const AdminForm = () => {
  const {
    email,
    password,
    error,
    success,
    navigate,
    handleEmailChange,
    handlePasswordChange,
    handleError,
    handleSuccess,
  } = useAdminForm();


  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      handleError(true);
      setTimeout(() => {
        handleError(false);
      }, 1000);
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        handleSuccess(true);
        setTimeout(() => {
          navigate("/admin/add-product");
          handleSuccess(false);
        }, 1000);
      })
      .catch(() => {
        handleError(true);
        setTimeout(() => {
          handleError(false);
        }, 1000);
      });
  };

  return (
    <div className="col-sm-6 form ms-sm-0">
      <div className="form-peice">
        <form onSubmit={handleAdminLogin}>
          <div className="d-flex justify-content-center">
            <img className="img-fluid pb-2 h-25 w-75" src="src\assets\logo.png" alt="Logo Ingemeco img"/>
          </div>

          <div className="form__group field my-3">
            <input
              type="email"
              id="email"
              className="form__field"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              placeholder="email"
              required
            />
            <label htmlFor="email" className="form__label">
              Correo Electrónico
            </label>
          </div>

          <div className="form__group field my-3">
            <input
              type="password"
              id="password"
              className="form__field"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              placeholder="password"
              required
            />
            <label htmlFor="password" className="form__label">
              Contraseña
            </label>
          </div>

          <div className="d-grid justify-content-center py-4">
            <button id="bottone5" type="submit">
              Iniciar Sesión
            </button>
          </div>

          {success && (
            <Alerts
              message="Éxito"
              // message2="Ingresando ..." 
              type="alert-success"
              svg={<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#ffffff" d="m9 20.42l-6.21-6.21l2.83-2.83L9 14.77l9.88-9.89l2.83 2.83L9 20.42Z" /></svg>}
            />
          )}

          {error && (
            <Alerts
              message="Error"
              message2="Credenciales incorrectos" 
              type="alert-danger"
              svg={<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#ffffff" d="M12 4a8 8 0 1 0 0 16a8 8 0 0 0 0-16zM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12zm5.793-4.207a1 1 0 0 1 1.414 0L12 10.586l2.793-2.793a1 1 0 1 1 1.414 1.414L13.414 12l2.793 2.793a1 1 0 0 1-1.414 1.414L12 13.414l-2.793 2.793a1 1 0 0 1-1.414-1.414L10.586 12L7.793 9.207a1 1 0 0 1 0-1.414z" /></svg>}
            />
          )}
        </form>
      </div>
    </div>
  );
};
