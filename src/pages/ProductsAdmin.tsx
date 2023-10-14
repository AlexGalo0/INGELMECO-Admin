import { ProductTable } from "../Components";
import { Sidebar } from "../Components/Sidebar";
export const ProductsAdmin = () => {
  return (
    <div className="container-sidebar">
      <Sidebar />
      <ProductTable />
    </div>
  );
};
