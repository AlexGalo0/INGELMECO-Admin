import { auth } from "../config/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
export const AdminForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleAdminLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 1000);
      })
      .catch(() => {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 1000);
      });
  };

  return (
    <>
      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="Correo Electronico"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleAdminLogin}>Iniciar Sesión</button>
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
    </>
  );
};
