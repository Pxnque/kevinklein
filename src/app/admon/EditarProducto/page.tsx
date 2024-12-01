"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "../../components/Sidebaradmon/Sidebaradmon";
import { Header } from "../../components/HeaderAdmon/HeaderAdmon";
import PocketBase from "pocketbase";

const pb = new PocketBase("https://kevinklein.pockethost.io");

export default function EditarProductoPage() {
  const [editable, setEditable] = useState(false);
  const [productos, setProductos] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    precio: "",
    descuento: "",
    tallas: "",
    cantidad: "",
    id_categoria: "",
    fotos: [],
  });
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await pb.collection("productos").getFullList(200, { sort: "-created" });
        setProductos(response);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    const fetchCategorias = async () => {
      try {
        const response = await pb.collection("categorias").getFullList(200, { sort: "-created" });
        setCategorias(response);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };

    fetchProductos();
    fetchCategorias();
  }, []);

  const handleSelectChange = async (e) => {
    const productoId = e.target.value;
    if (productoId) {
      try {
        const producto = await pb.collection("productos").getOne(productoId);
        setFormData({
          id: producto.id,
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          precio: producto.precio,
          descuento: producto.descuento || "",
          tallas: producto.tallas.join(", "),
          cantidad: producto.cantidad,
          id_categoria: producto.id_categoria,
          fotos: producto.fotos,
        });
      } catch (error) {
        console.error("Error al obtener producto:", error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        fotos: Array.from(e.target.files),
      }));
    }
  };

  const toggleEditable = () => {
    setEditable(!editable);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("nombre", formData.nombre);
    data.append("descripcion", formData.descripcion);
    data.append("precio", formData.precio);
    data.append("descuento", formData.descuento || "0");
    data.append("cantidad", formData.cantidad);
    data.append("id_categoria", formData.id_categoria);
    formData.tallas.split(",").forEach((talla) => data.append("tallas[]", talla.trim()));
    formData.fotos.forEach((foto) => data.append("fotos", foto));

    try {
      const response = await pb.collection("productos").update(formData.id, data);
      console.log("Producto actualizado:", response);
      alert("Producto actualizado exitosamente");
      setEditable(false);
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex flex-col w-full">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6 overflow-y-auto bg-gray-100">
            <div className="max-w-[1200px] mx-auto">
              <div className="mb-6 pt-20 flex justify-between items-center">
                <h1 className="text-4xl font-bold text-center text-gray-800">Editar Producto</h1>
                <button
                  onClick={toggleEditable}
                  className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
                >
                  {editable ? "Bloquear" : "Editar"}
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Seleccione Producto
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded-md p-2 text-sm text-black"
                      onChange={handleSelectChange}
                      disabled={editable}
                    >
                      <option value="">Seleccione un producto</option>
                      {productos.map((producto) => (
                        <option key={producto.id} value={producto.id}>
                          {producto.nombre}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md p-2 text-sm text-black"
                        disabled={!editable}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descripción
                      </label>
                      <textarea
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md p-2 text-sm text-black"
                        disabled={!editable}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Precio</label>
                      <input
                        type="number"
                        name="precio"
                        value={formData.precio}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md p-2 text-sm text-black"
                        disabled={!editable}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descuento
                      </label>
                      <input
                        type="number"
                        name="descuento"
                        value={formData.descuento}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md p-2 text-sm text-black"
                        disabled={!editable}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tallas</label>
                      <input
                        type="text"
                        name="tallas"
                        value={formData.tallas}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md p-2 text-sm text-black"
                        disabled={!editable}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cantidad</label>
                      <input
                        type="number"
                        name="cantidad"
                        value={formData.cantidad}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md p-2 text-sm text-black"
                        disabled={!editable}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                      <select
                        name="id_categoria"
                        value={formData.id_categoria}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md p-2 text-sm text-black"
                        disabled={!editable}
                      >
                        <option value="">Seleccione una categoría</option>
                        {categorias.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.nombre}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fotos</label>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="w-full border border-gray-300 rounded-md p-2 text-sm text-black"
                      disabled={!editable}
                    />
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-4 py-2 rounded-md text-sm"
                      disabled={!editable}
                    >
                      Guardar Cambios
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditable(false)}
                      className="bg-red-600 text-white px-4 py-2 rounded-md text-sm"
                    >
                      Descartar Cambios
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
