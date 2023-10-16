import { ProductTable, Sidebar } from "../Components";
export const ProductsAdmin = () => {
  return (
    <div className="container-sidebar">
      <Sidebar />
      <div className="product-table-container">
        <ProductTable />
      </div>
    </div>
  );
};
