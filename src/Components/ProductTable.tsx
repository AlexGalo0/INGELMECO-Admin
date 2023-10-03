import { useProductFetch } from "../hooks/useProductFetch";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../config/firebase.js";
import { deleteObject, ref } from "firebase/storage";

export const ProductTable = () => {
  const { productos, loading , fetchProducts} = useProductFetch();
  const handleDelete = async (id: string, imageName:string, imageSecondaryName:string,pdfName:string) => {
    console.log(id);
    console.log(imageName, imageSecondaryName,pdfName);
    try {
      // Elimina el documento de Firestore por su ID
      await deleteDoc(doc(collection(db, "productos"), id));
      // Elimina la imagen del storage
     await deleteObject(ref(storage, `productos/${imageName}`));
     await deleteObject(ref(storage, `productos/${imageSecondaryName}`));
      await deleteObject(ref(storage, `pdfs/${pdfName}`));
       // Después de borrar, actualiza la tabla
       fetchProducts();
    } catch (error) {
      console.error("Error al borrar el producto:", error);
    }
  };

  return (
    <div>
      <h1>Productos</h1>
      {loading ? (
        <p>Cargando productos...</p>
      ) : (
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
                  <button onClick={() => handleDelete(producto.id, producto.imageName,producto.imageNameSecondary,producto.pdfName)}>
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
