import { auth } from "../config/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAdminForm } from "../hooks/useAdminForm.js";

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
    <div className="col-sm-6 form">
      <div className="form-peice">
        <form onSubmit={handleAdminLogin}>
          <img
            className="img-fluid pb-4"
            src="src\assets\logo.png"
            alt="Logo Ingemeco img"
          />

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
            <div className="alert alert-success mt-3">
              <span>Ingreso Exitoso</span>
            </div>
          )}

          {error && (
            <div className="alert alert-danger mt-3">
              <span>Correo o Contraseña Incorrecta</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
