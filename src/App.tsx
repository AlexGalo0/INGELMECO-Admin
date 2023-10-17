import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginAdmin, ProductsAdmin, FormProductsAdmin } from "./pages";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginAdmin />} />
          <Route
            path="/admin/add-product"
            element={<ProtectedRoute element={<FormProductsAdmin />} />}
            // Usa ProtectedRoute para proteger esta ruta
          />
          <Route
            path="/admin/products"
            element={<ProtectedRoute element={<ProductsAdmin />} />}
            // Usa ProtectedRoute para proteger esta ruta
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
