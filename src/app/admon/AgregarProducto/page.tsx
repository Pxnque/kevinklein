"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "../../components/Sidebaradmon/Sidebaradmon";
import { Header } from "../../components/HeaderAdmon/HeaderAdmon";
import PocketBase from "pocketbase";

const pb = new PocketBase("https://kevinklein.pockethost.io");

export default function AgregarProductoPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    descuento: "",
    cantidad: "",
    tallas: [] as string[],
    id_categoria: "",
    fotos: [] as File[],
  });

  const [categorias, setCategorias] = useState<{ id: string; nombre: string }[]>([]);
  const [errors, setErrors] = useState({ general: "" });

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await pb.collection("categorias").getFullList(200, {
          sort: "-created",
        });

        setCategorias(response.map((cat) => ({ id: cat.id, nombre: cat.nombre })));
        setErrors({ general: "" });
      } catch (error) {
        console.error("Error al obtener categorías:", error);
        setErrors({ general: "No se pudieron cargar las categorías." });
      }
    };

    fetchCategorias();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        fotos: Array.from(e.target.files),
      }));
    }
  };

  const handleTallasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      tallas: checked
        ? [...prev.tallas, value]
        : prev.tallas.filter((talla) => talla !== value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { nombre, descripcion, precio, descuento, cantidad, tallas, id_categoria, fotos } =
      formData;

    if (!nombre || !descripcion || !precio || !cantidad || !id_categoria || tallas.length === 0) {
      setErrors({ general: "Todos los campos son obligatorios y deben ser válidos." });
      return;
    }

    const data = new FormData();
    data.append("nombre", nombre);
    data.append("descripcion", descripcion);
    data.append("precio", precio);
    data.append("descuento", descuento || "0"); // Descuento opcional
    data.append("cantidad", cantidad);
    data.append("id_categoria", id_categoria);
    tallas.forEach((talla) => data.append("tallas[]", talla));
    fotos.forEach((foto) => data.append("fotos", foto));

    try {
      const response = await pb.collection("productos").create(data);
      console.log("Producto creado:", response);
      alert("Producto añadido exitosamente");
      setFormData({
        nombre: "",
        descripcion: "",
        precio: "",
        descuento: "",
        cantidad: "",
        tallas: [],
        id_categoria: "",
        fotos: [],
      });
      setErrors({ general: "" });
    } catch (err: any) {
      console.error("Error al añadir producto:", err);
      setErrors({ general: "Ocurrió un error al añadir el producto." });
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
              <div className="mb-6 pt-20 text-center">
                <h1 className="text-4xl font-bold text-gray-800">Añadir Producto</h1>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                {errors.general && (
                  <div className="mb-4 text-red-600 text-sm">{errors.general}</div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Nombre */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md p-2 text-sm text-black"
                      placeholder="Ingrese el nombre del producto"
                    />
                  </div>

                  {/* Descripción */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descripción
                    </label>
                    <textarea
                      name="descripcion"
                      value={formData.descripcion}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md p-2 text-sm text-black"
                      placeholder="Escribe una descripción del producto"
                    />
                  </div>

                  {/* Precio y Descuento */}
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Precio</label>
                      <input
                        type="number"
                        step="0.01"
                        name="precio"
                        value={formData.precio}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md p-2 text-sm text-black"
                        placeholder="Ingrese el precio"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descuento
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        name="descuento"
                        value={formData.descuento}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md p-2 text-sm text-black"
                        placeholder="Ingrese el descuento (opcional)"
                      />
                    </div>
                  </div>

                  {/* Cantidad */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cantidad</label>
                    <input
                      type="number"
                      name="cantidad"
                      value={formData.cantidad}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md p-2 text-sm text-black"
                      placeholder="Ingrese la cantidad disponible"
                    />
                  </div>

                  {/* Fotos */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fotos</label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full border border-gray-300 rounded-md p-2 text-sm text-black"
                    />
                  </div>

                  {/* Tallas */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tallas</label>
                    <div className="flex space-x-4">
                      {["XS", "S", "M", "L", "XL"].map((talla) => (
                        <label key={talla} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            value={talla}
                            checked={formData.tallas.includes(talla)}
                            onChange={handleTallasChange}
                          />
                          <span>{talla}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Categoría */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                    <select
                      name="id_categoria"
                      value={formData.id_categoria}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md p-2 text-sm text-black"
                    >
                      <option value="">Seleccione una categoría</option>
                      {categorias.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.nombre}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Botones */}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-4 py-2 rounded-md text-sm"
                    >
                      Añadir Producto
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
