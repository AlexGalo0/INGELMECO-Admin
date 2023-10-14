import { auth } from "../config/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAdminForm } from "../hooks/useAdminForm.js";
import { useState } from "react";

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

  const handleFocus = (state: React.Dispatch<React.SetStateAction<boolean>>) => {
    state(true);
  };

  const handleBlur = (state: React.Dispatch<React.SetStateAction<boolean>>, variable: string) => {
    if (variable === '') {
      state(false);
    }
  };

  const [isActiveEml, setIsActiveEml] = useState<boolean>(false);
  const [isActivePass, setIsActivePass] = useState<boolean>(false);

  return (
    <div className="col-sm-6 form">
      <div className="signup form-peice">
        <form onSubmit={handleAdminLogin} className="signup-form">

          <img className="img-fluid" src="src\assets\logo.png" alt="Logo Ingemeco img" />

          <div className="form-group">
            <label htmlFor="email" className={isActiveEml ? 'active' : ''}>Correo Electrónico</label>
            <input
              type="email"
              id="email"
              className=""
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              onFocus={() => handleFocus(setIsActiveEml)}
              onBlur={() => handleBlur(setIsActiveEml, email)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className={isActivePass ? 'active' : ''}>Password</label>
            <input
              type="password"
              id="password"
              className=""
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              onFocus={() => handleFocus(setIsActivePass)}
              onBlur={() => handleBlur(setIsActivePass, password)}
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
      </div>
    </div>
  );
};
