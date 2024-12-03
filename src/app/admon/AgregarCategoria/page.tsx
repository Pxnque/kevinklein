"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "../../components/Sidebaradmon/Sidebaradmon";
import { Header } from "../../components/HeaderAdmon/HeaderAdmon";
import PocketBase from "pocketbase";

const pb = new PocketBase("https://kevinklein.pockethost.io");

export default function AgregarCategoriaPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    gender: "",
  });

  const [categorias, setCategorias] = useState<{ id: string; nombre: string; gender: string }[]>([]);
  const [errors, setErrors] = useState({ general: "" });

  // Función para manejar el cambio de los campos del formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Función para enviar el formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { nombre, gender } = formData;

    // Validación simple
    if (!nombre || !gender) {
      setErrors({ general: "Todos los campos son obligatorios." });
      return;
    }

    // Mapear los valores de 'gender' a 'H' o 'M'
    const genderMap: { [key: string]: string } = {
      Hombre: "H",
      Mujer: "M",
      Unisex: "U", // Si necesitas un valor para Unisex también
    };

    const data = {
      nombre,
      gender: genderMap[gender], // Guardar como 'H', 'M' o 'U'
    };

    try {
      const response = await pb.collection("categorias").create(data);
      console.log("Categoría creada:", response);
      alert("Categoría añadida exitosamente");

      // Resetear los campos del formulario
      setFormData({
        nombre: "",
        gender: "",
      });
      setErrors({ general: "" });

      // Volver a cargar las categorías después de agregar una nueva
      fetchCategorias();
    } catch (err: any) {
      console.error("Error al añadir categoría:", err);
      setErrors({ general: "Ocurrió un error al añadir la categoría." });
    }
  };

  // Función para obtener las categorías
  const fetchCategorias = async () => {
    try {
      const response = await pb.collection("categorias").getFullList(200, {
        sort: "-created",
      });

      setCategorias(response.map((cat: any) => ({ id: cat.id, nombre: cat.nombre, gender: cat.gender })));
      setErrors({ general: "" });
    } catch (error) {
      console.error("Error al obtener categorías:", error);
      setErrors({ general: "No se pudieron cargar las categorías." });
    }
  };

  // Función para eliminar una categoría
  const handleDelete = async (id: string) => {
    try {
      await pb.collection("categorias").delete(id);
      alert("Categoría eliminada exitosamente");
      fetchCategorias(); // Recargar las categorías después de eliminar una
    } catch (err: any) {
      console.error("Error al eliminar la categoría:", err);
      alert("Ocurrió un error al eliminar la categoría.");
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex flex-col w-full">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6 overflow-y-auto bg-gray-100">
            <div className="max-w-[1200px] mx-auto">
              <div className="mb-6 pt-20 text-center">
                <h1 className="text-4xl font-bold text-gray-800">Añadir Categoría</h1>
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
                      placeholder="Ingrese el nombre de la categoría"
                    />
                  </div>

                  {/* Gender */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Género</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md p-2 text-sm text-black"
                    >
                      <option value="">Seleccione un género</option>
                      <option value="Mujer">Mujer</option>
                      <option value="Hombre">Hombre</option>
                      <option value="Unisex">Unisex</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md"
                  >
                    Añadir Categoría
                  </button>
                </form>
              </div>

              <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Categorías Existentes</h2>
                <div className="space-y-4">
                  {categorias.map((categoria) => (
                    <div key={categoria.id} className="flex justify-between items-center text-black">
                      <div>
                        <strong>{categoria.nombre}</strong> -{" "}
                        {categoria.gender === "H" ? "Hombre" : categoria.gender === "M" ? "Mujer" : "Unisex"}
                      </div>
                      <button
                        onClick={() => handleDelete(categoria.id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                      >
                        Eliminar
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
