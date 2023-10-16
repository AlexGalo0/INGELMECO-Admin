import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductForm } from "./Components";
import { LoginAdmin, ProductsAdmin } from "./pages";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginAdmin />} />
          <Route path="/admin/add-product" element={<ProductForm />} />
          <Route path="/admin/products" element={<ProductsAdmin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
