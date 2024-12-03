"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Image from "next/image";
import gridIcon from "../Img/Grid.png";
import listIcon from "../Img/list.png";
import Sidebar from "../components/Sidebar/Sidebar";
import Card from "../components/Card/ProductCard";
import pb from "@/app/lib/pocketbase";
import Chatbot from "../components/Chatbot/Chatbot";
// Tipo para los productos
interface Producto {
  id: string;
  nombre: string;
  url: string;
  precio: number;
  descuento: number;
  rating: number; // rating promedio
  categoriaId: string;
}

interface Categoria {
  id: string;
  nombre: string;
}


const HomePage: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]); // Estado para almacenar los productos con rating
  const [categorias, setCategorias] = useState<Categoria[]>([]); // Todas las categorías
  const [filteredProductos, setFilteredProductos] = useState<Producto[]>([]); // Productos filtrados
  const [loading, setLoading] = useState<boolean>(true); // Estado para controlar el indicador de carga
  const [searchTerm, setSearchTerm] = useState<string>(''); // Término de búsqueda
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // Categorías seleccionadas
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]); // Rangos de precio seleccionados
  const [selectedRating, setSelectedRating] = useState<number | null>(null); // Calificación seleccionada


  const handleSearch = (term: string) => {
    setSearchTerm(term); // Actualiza el término de búsqueda
    handleFilterChange(selectedCategories, selectedPriceRanges, selectedRating); // Refiltra los productos
  };

  // Función para mostrar productos populares
  const handleShowPopular = () => {
    // Seleccionar 6 productos aleatorios
    const randomProductos = productos.sort(() => 0.5 - Math.random()).slice(0, 6);
    setFilteredProductos(randomProductos);
    // Limpiar todos los filtros
    setSelectedCategories([]);
    setSelectedPriceRanges([]);
    setSelectedRating(null);
  };

  // Consultar productos y ratings
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener productos
        const productosData = await pb.collection("productos").getFullList(200, {requestKey: null});
        const formattedProductos = productosData.map((producto: any) => ({
          id: producto.id,
          nombre: producto.nombre,
          url: producto.fotos && producto.fotos[0] ? pb.files.getURL(producto, producto.fotos[0]) : "",
          descripcion: producto.descripcion,
          precio: producto.precio,
          descuento: producto.descuento,
          categoriaId: producto.id_categoria,
        }));

        // Obtener ratings para cada producto
        const reviewsData = await pb.collection("product_reviews").getFullList(200, {requestKey: null});
        const ratingsMap: Record<string, { total: number; count: number }> = {};

        reviewsData.forEach((review: any) => {
          const productId = review.product_id;
          if (!ratingsMap[productId]) {
            ratingsMap[productId] = { total: 0, count: 0 };
          }
          ratingsMap[productId].total += review.rating;
          ratingsMap[productId].count += 1;
        });

        // Calcular el rating promedio para cada producto
        const productosConRatings = formattedProductos.map((producto) => ({
          ...producto,
          rating: ratingsMap[producto.id]
            ? ratingsMap[producto.id].total / ratingsMap[producto.id].count
            : 0,
        }));
        setProductos(productosConRatings);

        // Obtener categorías
        const categoriasData = await pb.collection('categorias').getFullList(200, {requestKey: null});
        const formattedCategorias = categoriasData.map((categoria: any) => ({
          id: categoria.id,
          nombre: categoria.nombre,
        }));
        setCategorias(formattedCategorias);
        setFilteredProductos(productosConRatings); // Mostrar todos inicialmente

      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Manejar filtros
  const handleFilterChange = (categories: string[], priceRanges: string[], rating: number | null) => {
    setSelectedCategories(categories); // Actualiza las categorías seleccionadas
    setSelectedPriceRanges(priceRanges); // Actualiza los rangos de precio seleccionados
    setSelectedRating(rating); // Actualiza la calificación seleccionada  

    const filteredByCategory =
      categories.length === 0
        ? productos
        : productos.filter((producto) => categories.includes(producto.categoriaId));

    // Filtrar por precio (solo si se seleccionan rangos de precios)
    const filteredByPrice =
      priceRanges.length === 0
        ? filteredByCategory // Si no hay rangos de precios seleccionados, mantener todos los productos de categoría
        : filteredByCategory.filter((producto) => {
          const realPrice = (producto.precio * (1 - producto.descuento));
          if (priceRanges.includes('menos100') && realPrice < 100) return true;
          if (priceRanges.includes('100-250') && realPrice >= 100 && realPrice <= 250) return true;
          if (priceRanges.includes('250-350') && realPrice >= 250 && realPrice <= 350) return true;
          if (priceRanges.includes('mas500') && realPrice > 500) return true;
          return false;
        });

    // Filtrar por calificación
    const filteredByRating =
      rating === null
        ? filteredByPrice
        : filteredByPrice.filter((producto) => Math.floor(producto.rating) === rating);

    // Filtrar por término de búsqueda
    const filteredBySearch = searchTerm
      ? filteredByRating.filter((producto) =>
        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      )
      : filteredByRating;

    setFilteredProductos(filteredBySearch);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-10 px-4 bg-gray-100">
        <div className="flex">
          <aside className="w-1/4 p-4">
            {/* Pasar el arreglo completo de productos al Sidebar */}
            {loading ? (
              <p>Cargando Sidebar...</p>
            ) : (
              <Sidebar productos={productos} categorias={categorias}
                onFilterChange={(categories, priceRanges, rating) =>
                  handleFilterChange(categories, priceRanges, rating)}
                onShowPopular={handleShowPopular} // Pasar función de "Populares"
                onSearch={handleSearch}
              />
            )}
          </aside>
          <section className="w-3/4 p-4">
            {/* Barra de cantidad, orden y vista */}
            <div className="flex justify-between items-center p-4 bg-white shadow-md mb-6">
              <div className="flex items-center">
                <label htmlFor="cantidad" className="mr-2 text-gray-500">
                  Cantidad:
                </label>
                <select
                  id="cantidad"
                  className="border border-gray-300 p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-md bg-gray-100"
                >
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>

              <div className="flex items-center">
                <label htmlFor="ordenar" className="mr-2 text-gray-500">
                  Ordenar por:
                </label>
                <select
                  id="ordenar"
                  className="border border-gray-300 p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-md bg-gray-100"
                >
                  <option value="default">Default</option>
                  <option value="price-asc">Precio (ascendente)</option>
                  <option value="price-desc">Precio (descendente)</option>
                  <option value="rating">Mejor calificado</option>
                </select>
              </div>

              {/* Botones de vista */}
              <div className="flex items-center">
                {/* <button className="mr-2 p-2 bg-gray-200 rounded-md hover:bg-gray-300 focus:ring-2 focus:ring-gray-300">
                  <Image
                    src={gridIcon}
                    alt="Grid View"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </button>
                <button className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 focus:ring-2 focus:ring-gray-300">
                  <Image
                    src={listIcon}
                    alt="List View"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </button> */}
              </div>

              <p className="text-gray-500">
                Mostrando {productos.length > 0 ? `1 - ${productos.length}` : "0"} productos
              </p>
            </div>

            <br />

            {/* Renderizar productos */}
            {loading ? (
              <p>Cargando productos...</p>
            ) : filteredProductos.length > 0 ? (
              <div className="grid grid-cols-2 gap-6">
                {filteredProductos.map((producto) => (
                  <a href={`/productos/${producto.id}`} className="hover:scale-105 transition duration-500">
                    <Card key={producto.id} productData={producto} rating={producto.rating} />
                  </a>
                ))}
              </div>
            ) : (
              <p>No hay productos disponibles.</p>
            )}
          </section>
        </div>
      </main>
      <Chatbot />
      <Footer />
    </div>
  );
};

export default HomePage;
