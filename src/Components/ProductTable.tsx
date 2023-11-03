import { useProductFetch } from "../hooks/useProductFetch";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../config/firebase.ts";
import { deleteObject, ref } from "firebase/storage";
import { useAuth } from "../context/AuthContext.tsx";
import { useNavigate } from 'react-router-dom';

export const ProductTable = () => {

  const { productos, loading, fetchProducts } = useProductFetch();
  const navigate = useNavigate();
  const { setCurrentProduct } = useAuth();

  const handleDelete = async (
    id: string,
    imageName: string,
    imageSecondaryName: string,
    pdfName: string
  ) => {
    try {
      // Elimina el documento de Firestore por su ID
      await deleteDoc(doc(collection(db, "productos"), id));
      // Elimina la imagen del storage
      await deleteObject(ref(storage, `productos/${imageName}`));
      if (imageSecondaryName) {
        await deleteObject(ref(storage, `productos/${imageSecondaryName}`));
      }
      if (pdfName) {
        await deleteObject(ref(storage, `pdfs/${pdfName}`));
      }
    } catch (error) {
      console.error("Error al borrar el producto:", error);
    } finally {
      fetchProducts();
    }
  };

  const handleEdit = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, id: string) => {
    e.preventDefault();
    const product = productos.find((producto) => producto.id === id);

    if (product) {
      setCurrentProduct(product);
      setTimeout(() => {
        navigate("/admin/add-product");
      }, 500);
    }
  }

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center ">
          <h2 className="text-white text-2xl">Cargando productos...</h2>
        </div>
      ) : (
        <div className="container p-xxl-5 p-md-4">
          <p className="text-light fw-bold fs-3">Lista de Productos</p>

          <div className="custom-scroll">
            <table className="table table-striped table-hover table-bordered border-light-subtle">
              <thead className="text-center">
                <tr>
                  <th scope="col">Nombre</th>
                  <th className="d-none d-xxl-table-cell" scope="col">
                    Descripción
                  </th>
                  <th className="d-none d-xl-table-cell d-xxl-table-cell" scope="col">
                    Marca
                  </th>
                  <th scope="col">Categoria</th>
                  <th className="d-none d-xxl-table-cell" scope="col">
                    Sub Categoría
                  </th>
                  <th scope="col">Borrar</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.id} onDoubleClick={(e) => handleEdit(e, producto.id)}>
                    {/*nombre*/}
                    <td className="">{producto.nombreProducto}</td>
                    {/*descripcion*/}
                    <td className="d-none d-xxl-table-cell">
                      {producto.descripcionProducto.length > 15
                        ? producto.descripcionProducto.slice(0, 15) + "..."
                        : producto.descripcionProducto}
                    </td>
                    {/*marca*/}
                    <td className="d-none d-xl-table-cell d-xxl-table-cell">
                      {producto.marcaProducto}
                    </td>
                    {/*categoria*/}
                    <td>{producto.categoriaProducto}</td>
                    {/*subcategoria*/}
                    <td className="d-none d-xxl-table-cell">
                      {producto.subcategoriaProducto.length > 14
                        ? producto.subcategoriaProducto.slice(0, 14) + "..."
                        : producto.subcategoriaProducto}
                    </td>
                    {/*boton borrar*/}
                    <td className="text-center">
                      <button
                        onClick={() =>
                          handleDelete(
                            producto.id,
                            producto.imageName,
                            producto.imageNameSecondary,
                            producto.pdfName
                          )
                        }
                        className="btn fw-bold text-white"
                        style={{
                          backgroundColor: "#048c88",
                          borderRadius: "20px",
                        }}
                      >
                        Borrar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};
