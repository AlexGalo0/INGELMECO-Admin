import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminForm } from "./Components/AdminForm";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminForm />} />
          <Route
            path="/home"
            element={
              <>
                <h1>Home</h1>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
