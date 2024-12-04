"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Sidebar from "../components/Sidebar/Sidebar";
import Card from "../components/Card/ProductCard";
import pb from "@/app/lib/pocketbase";
import Chatbot from "../components/Chatbot/Chatbot";

interface Producto {
  id: string;
  nombre: string;
  url: string;
  precio: number;
  descuento: number;
  rating: number;
  categoriaId: string;
}

interface Categoria {
  id: string;
  nombre: string;
}

const HomePage: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [filteredProductos, setFilteredProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState<string>('default');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(25);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    handleFilterChange(selectedCategories, selectedPriceRanges, selectedRating);
  };

  const handleShowPopular = () => {
    const randomProductos = productos.sort(() => 0.5 - Math.random()).slice(0, 6);
    setFilteredProductos(randomProductos);
    setSelectedCategories([]);
    setSelectedPriceRanges([]);
    setSelectedRating(null);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productosData = await pb.collection("productos").getFullList(200, { requestKey: null });
        const formattedProductos = productosData.map((producto: any) => ({
          id: producto.id,
          nombre: producto.nombre,
          url: producto.fotos && producto.fotos[0] ? pb.files.getURL(producto, producto.fotos[0]) : "",
          descripcion: producto.descripcion,
          precio: producto.precio,
          descuento: producto.descuento,
          categoriaId: producto.id_categoria,
        }));

        const reviewsData = await pb.collection("product_reviews").getFullList(200, { requestKey: null });
        const ratingsMap: Record<string, { total: number; count: number }> = {};

        reviewsData.forEach((review: any) => {
          const productId = review.product_id;
          if (!ratingsMap[productId]) {
            ratingsMap[productId] = { total: 0, count: 0 };
          }
          ratingsMap[productId].total += review.rating;
          ratingsMap[productId].count += 1;
        });

        const productosConRatings = formattedProductos.map((producto) => ({
          ...producto,
          rating: ratingsMap[producto.id]
            ? ratingsMap[producto.id].total / ratingsMap[producto.id].count
            : 0,
        }));
        setProductos(productosConRatings);

        const categoriasData = await pb.collection('categorias').getFullList(200, { requestKey: null });
        const formattedCategorias = categoriasData.map((categoria: any) => ({
          id: categoria.id,
          nombre: categoria.nombre,
        }));
        setCategorias(formattedCategorias);
        setFilteredProductos(productosConRatings);

      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (categories: string[], priceRanges: string[], rating: number | null) => {
    setSelectedCategories(categories);
    setSelectedPriceRanges(priceRanges);
    setSelectedRating(rating);
    setCurrentPage(1); // Reset to first page when filters change

    const filteredByCategory =
      categories.length === 0
        ? productos
        : productos.filter((producto) => categories.includes(producto.categoriaId));

    const filteredByPrice =
      priceRanges.length === 0
        ? filteredByCategory
        : filteredByCategory.filter((producto) => {
          const realPrice = producto.precio * (1 - producto.descuento);
          if (priceRanges.includes('menos100') && realPrice < 100) return true;
          if (priceRanges.includes('100-250') && realPrice >= 100 && realPrice <= 250) return true;
          if (priceRanges.includes('250-350') && realPrice >= 250 && realPrice <= 350) return true;
          if (priceRanges.includes('mas500') && realPrice > 500) return true;
          return false;
        });

    const filteredByRating =
      rating === null
        ? filteredByPrice
        : filteredByPrice.filter((producto) => Math.floor(producto.rating) === rating);

    const filteredBySearch = searchTerm
      ? filteredByRating.filter((producto) =>
        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      )
      : filteredByRating;

    setFilteredProductos(filteredBySearch);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
    setCurrentPage(1);
  };

  // Apply sorting
  const sortedProductos = [...filteredProductos].sort((a, b) => {
    if (sortOption === 'price-asc') {
      return a.precio * (1 - a.descuento) - b.precio * (1 - b.descuento);
    }
    if (sortOption === 'price-desc') {
      return b.precio * (1 - b.descuento) - a.precio * (1 - a.descuento);
    }
    if (sortOption === 'rating') {
      return b.rating - a.rating;
    }
    return 0;
  });

  // Calculate pagination indices
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = sortedProductos.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-10 px-4 bg-gray-100">
        <div className="flex">
          <aside className="w-1/4 p-4">
            {loading ? (
              <p>Cargando Sidebar...</p>
            ) : (
              <Sidebar
                productos={productos}
                categorias={categorias}
                onFilterChange={(categories, priceRanges, rating) =>
                  handleFilterChange(categories, priceRanges, rating)
                }
                onShowPopular={handleShowPopular}
                onSearch={handleSearch}
              />
            )}
          </aside>
          <section className="w-3/4 p-4">
            <div className="flex flex-wrap justify-between items-center p-4 bg-white shadow-md mb-6 gap-4 sm:gap-6">
              {/* Quantity Selector */}
              <div className="flex items-center w-full sm:w-auto sm:flex-shrink-0">
                <label htmlFor="cantidad" className="mr-2 text-gray-500 whitespace-nowrap">
                  Cantidad:
                </label>
                <select
                  id="cantidad"
                  className="border border-gray-300 p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-md bg-gray-100 w-full sm:w-auto"
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                >
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>

              {/* Sort Selector */}
              <div className="flex items-center w-full sm:w-auto sm:flex-shrink-0">
                <label htmlFor="ordenar" className="mr-2 text-gray-500 whitespace-nowrap">
                  Ordenar por:
                </label>
                <select
                  id="ordenar"
                  className="border border-gray-300 p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-md bg-gray-100 w-full sm:w-auto"
                  value={sortOption}
                  onChange={handleSortChange}
                >
                  <option value="default">Default</option>
                  <option value="price-asc">Precio (ascendente)</option>
                  <option value="price-desc">Precio (descendente)</option>
                  <option value="rating">Mejor calificado</option>
                </select>
              </div>

              {/* Product Count */}
              <p className="text-gray-500 w-full sm:w-auto text-center sm:text-right">
                Mostrando {filteredProductos.length > 0 ? `${indexOfFirstProduct + 1} - ${Math.min(indexOfLastProduct, filteredProductos.length)} de ${filteredProductos.length}` : "0"} productos
              </p>
            </div>
            <br />
            {/* Render products */}
            {loading ? (
              <p>Cargando productos...</p>
            ) : currentProducts.length > 0 ? (
              <div className="grid 2xl:grid-cols-2 lg:grid-cols-1 gap-6">
                {currentProducts.map((producto) => (
                  <a key={producto.id} href={`/productos/${producto.id}`} className="hover:scale-105 transition duration-500">
                    <Card productData={producto} rating={producto.rating} />
                  </a>
                ))}
              </div>
            ) : (
              <p>No hay productos disponibles.</p>
            )}
            {/* Pagination Controls */}
            <div className="mt-6 flex justify-center items-center space-x-4">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-4 py-2 bg-gray-200 rounded-md"
              >
                Anterior
              </button>
              <p>Página {currentPage} de {Math.ceil(filteredProductos.length / itemsPerPage)}</p>
              <button
                disabled={currentPage === Math.ceil(filteredProductos.length / itemsPerPage)}
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-4 py-2 bg-gray-200 rounded-md"
              >
                Siguiente
              </button>
            </div>
          </section>
        </div>
      </main>
      <Chatbot />
      <Footer />
    </div>
  );
};

export default HomePage;
