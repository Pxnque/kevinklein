"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "../../components/Sidebaradmon/Sidebaradmon";
import { Header } from "../../components/HeaderAdmon/HeaderAdmon";
import PocketBase from "pocketbase";
import { useRouter } from "next/navigation";

const pb = new PocketBase("https://kevinklein.pockethost.io");

export default function EditarProductoPage() {
  const router = useRouter();
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
  const [productos, setProductos] = useState<{ id: string; nombre: string }[]>([]);
  const [errors, setErrors] = useState({ general: "" });
  const tallasDisponibles = ["XS", "S", "M", "L", "XL"];
  const [productoSeleccionado, setProductoSeleccionado] = useState<string>("");

  // Cargar categorías y productos
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

    const fetchProductos = async () => {
      try {
        const response = await pb.collection("productos").getFullList(200, {
          sort: "-created",
        });

        setProductos(response.map((prod) => ({ id: prod.id, nombre: prod.nombre })));
        setErrors({ general: "" });
      } catch (error) {
        console.error("Error al obtener productos:", error);
        setErrors({ general: "No se pudieron cargar los productos." });
      }
    };

    fetchCategorias();
    fetchProductos();
  }, []);

  // Obtener datos del producto cuando se selecciona uno
  useEffect(() => {
    if (productoSeleccionado) {
      const fetchProducto = async () => {
        try {
          const response = await pb.collection("productos").getOne(productoSeleccionado);

          setFormData({
            nombre: response.nombre,
            descripcion: response.descripcion,
            precio: response.precio.toString(),
            descuento: response.descuento.toString(),
            cantidad: response.cantidad.toString(),
            tallas: response.tallas || [],
            id_categoria: response.id_categoria,
            fotos: response.fotos || [],
          });
          setErrors({ general: "" });
        } catch (error) {
          console.error("Error al obtener producto:", error);
          setErrors({ general: "No se pudo cargar el producto." });
        }
      };
      fetchProducto();
    }
  }, [productoSeleccionado]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTallasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      tallas: checked
        ? [...prev.tallas, value.toUpperCase()]
        : prev.tallas.filter((talla) => talla !== value.toUpperCase()),
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({ ...prev, fotos: Array.from(e.target.files) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { nombre, descripcion, precio, descuento, cantidad, tallas, id_categoria, fotos } = formData;

    if (!nombre || !descripcion || !precio || !cantidad || !id_categoria || tallas.length === 0 || !fotos) {
      setErrors({ general: "Todos los campos son obligatorios y deben ser válidos." });
      return;
    }

    const data = {
      nombre,
      descripcion,
      precio: parseFloat(precio),
      descuento: parseFloat(descuento) || 0,
      cantidad: parseInt(cantidad, 10),
      tallas,
      id_categoria,
      fotos, // Agregar la imagen al objeto de datos
    };

    try {
      const response = await pb.collection("productos").update(productoSeleccionado, data);
      console.log("Producto editado:", response);
      alert("Producto editado exitosamente");
      
    } catch (err: any) {
      console.error("Error al editar producto:", err);
      setErrors({ general: "Ocurrió un error al editar el producto." });
    }
  };

  // Función para borrar el producto seleccionado
  const handleBorrarProducto = async () => {
    if (window.confirm("¿Estás seguro de que deseas borrar este producto?")) {
      try {
        await pb.collection("productos").delete(productoSeleccionado);
        alert("Producto borrado exitosamente");
        setProductoSeleccionado("");  // Limpiar la selección del producto
        setFormData({
          nombre: "",
          descripcion: "",
          precio: "",
          descuento: "",
          cantidad: "",
          tallas: [],
          id_categoria: "",
          fotos: [],
        });  // Limpiar el formulario
        router.push("/admin/productos");  // Redirigir a la lista de productos
      } catch (error) {
        console.error("Error al borrar el producto:", error);
        alert("No se pudo borrar el producto.");
      }
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
                <h1 className="text-4xl font-bold text-gray-800">Editar Producto</h1>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                {errors.general && (
                  <div className="mb-4 text-red-600 text-sm">{errors.general}</div>
                )}

                {/* Formulario de Búsqueda */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Buscar Producto</label>
                  <select
                    value={productoSeleccionado}
                    onChange={(e) => setProductoSeleccionado(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2 text-sm text-black"
                  >
                    <option value="">Selecciona un producto</option>
                    {productos.map((producto) => (
                      <option key={producto.id} value={producto.id}>
                        {producto.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Formulario de Edición del Producto */}
                {productoSeleccionado && (
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">Descuento</label>
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

                    {/* Tallas */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tallas</label>
                      <div className="flex flex-wrap gap-4">
                        {tallasDisponibles.map((talla) => (
                          <div key={talla} className="flex items-center">
                            <input
                              type="checkbox"
                              value={talla}
                              checked={formData.tallas.includes(talla)}
                              onChange={handleTallasChange}
                              className="mr-2"
                            />
                            <span>{talla}</span>
                          </div>
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
                        <option value="">Selecciona una categoría</option>
                        {categorias.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.nombre}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Fotos */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Fotos</label>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        className="w-full text-sm text-gray-700"
                      />
                    </div>

                    <div className="flex justify-center mt-6">
                      <button
                        type="submit"
                        className="bg-black text-white py-2 px-4 rounded-md text-sm font-semibold"
                      >
                        Guardar Cambios
                      </button>
                    </div>
                  </form>
                )}
                
                {/* Botón de borrar producto */}
                {productoSeleccionado && (
                  <div className="flex justify-center mt-4">
                    <button
                      onClick={handleBorrarProducto}
                      className="bg-red-600 text-white py-2 px-4 rounded-md text-sm font-semibold"
                    >
                      BORRAR REGISTRO
                    </button>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
