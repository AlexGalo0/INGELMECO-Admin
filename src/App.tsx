import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductForm } from "./Components/ProductForm";
import { LoginAdmin } from "./pages/LoginAdmin";
import { ProductTable } from "./Components/ProductTable";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginAdmin />} />
          <Route path="/admin/add-product" element={<ProductForm />} />
          <Route path= "/admin/products" element = {<ProductTable/>} />
          
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
