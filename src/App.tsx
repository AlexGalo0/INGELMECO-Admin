import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginAdmin, FormProductsAdmin } from "./pages";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./providers/ProtectedRoute";
import { ProductForm, ProductTable } from "./Components";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginAdmin />} />

          <Route path="admin" element={<ProtectedRoute><FormProductsAdmin /></ProtectedRoute>}>
            <Route path="add-product" element={<ProductForm />} />
            <Route path="products" element={<ProductTable />} />
          </Route>

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
