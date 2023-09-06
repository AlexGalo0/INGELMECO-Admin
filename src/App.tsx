import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminForm } from "./Components/AdminForm";
import { ProductForm } from "./Components/ProductForm";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminForm />} />
          <Route
            path="/admin/add"
            element={
              <ProductForm/>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
