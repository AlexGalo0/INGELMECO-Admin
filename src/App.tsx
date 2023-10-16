import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginAdmin, ProductsAdmin, FormProductsAdmin } from "./pages";
import { AuthProvider } from "./context/AuthProvider";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LoginAdmin />} />
            <Route path="/admin/add-product" element={<FormProductsAdmin />} />
            <Route path="/admin/products" element={<ProductsAdmin />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
