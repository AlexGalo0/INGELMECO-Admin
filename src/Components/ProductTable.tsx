import { useProductFetch } from "../hooks/useProductFetch";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../config/firebase.js";
import { deleteObject, ref } from "firebase/storage";

export const ProductTable = () => {
  const { productos, loading, fetchProducts } = useProductFetch();
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

  return (
    <div>
      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <div className="product-table">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Marca</th>
              <th>Categoria</th>
              <th>SubCategoria</th>
              <th>Borrar</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.nombreProducto}</td>
                <td>{producto.descripcionProducto}</td>
                <td>{producto.marcaProducto}</td>
                <td>{producto.categoriaProducto}</td>
                <td>{producto.subcategoriaProducto}</td>

                <td>
                  <button
                    onClick={() =>
                      handleDelete(
                        producto.id,
                        producto.imageName,
                        producto.imageNameSecondary,
                        producto.pdfName
                      )
                    }
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
};
