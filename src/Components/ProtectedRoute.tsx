import React from "react";
import { Navigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

const ProtectedRoute: React.FC<{
  element: React.ReactNode;
}> = ({ element }) => {
  const {user} = useAuth(); // Obtén el usuario del contexto de autenticación
    if (!user?.login) {
      // Si el usuario no está autenticado, redirige a la página de inicio de sesión
      console.log("No esta autenticado");
      return <Navigate to="/" />;
    } else {
      console.log("Esta autenticado");
    }

  return element;
};

export default ProtectedRoute;
