import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginAdmin, ProductsAdmin, FormProductsAdmin } from "./pages";
// Asegúrate de importar correctamente AuthProvider

function App() {
  return (
    <BrowserRouter>

        <Routes>
          {/* Ruta de inicio de sesión */}
          <Route path="/" element={<LoginAdmin />} />

          {/* Ruta protegida: agregar producto */}
          <Route
            path="/admin/add-product"
            element={
             
                <FormProductsAdmin />
            
            }
          />

          {/* Ruta protegida: lista de productos */}
          <Route
            path="/admin/products"
            element={
             
                <ProductsAdmin />
           
            }
          />
        </Routes>
    
    </BrowserRouter>
  );
}

export default App;
