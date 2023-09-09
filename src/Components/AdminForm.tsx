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
    <form onSubmit={handleAdminLogin}>
      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => handlePasswordChange(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Iniciar Sesión
      </button>
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
  );
};
