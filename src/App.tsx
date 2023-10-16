import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginAdmin, ProductsAdmin, FormProductsAdmin } from "./pages";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginAdmin />} />
          <Route path="/admin/add-product" element={<FormProductsAdmin />} />
          <Route path="/admin/products" element={<ProductsAdmin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
