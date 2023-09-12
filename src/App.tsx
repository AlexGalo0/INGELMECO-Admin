import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductForm } from "./Components/ProductForm";
import { LoginAdmin } from "./pages/LoginAdmin";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginAdmin />} />
          <Route path="/admin/add-product" element={<ProductForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
