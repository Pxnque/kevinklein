import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import ProductCardDiscount from '../CardDiscount/ProductCardDiscount';

// Sidebar Props and Types
interface Categoria {
  id: string;
  nombre: string;
}

interface Producto {
  id: string;
  nombre: string;
  url: string;
  precio: number;
  descuento: number;
}

interface SidebarProps {
  productos: Producto[];
  categorias: Categoria[];
  onFilterChange: (selectedCategories: string[], selectedPriceRanges: string[], rating: number | null) => void;
  onShowPopular: () => void;
  onSearch: (searchTerm: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ productos, categorias, onFilterChange, onShowPopular, onSearch }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false); // Sidebar toggle state

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleCategoryChange = (categoriaId: string, checked: boolean) => {
    const updatedCategories = checked
      ? [...selectedCategories, categoriaId]
      : selectedCategories.filter((id) => id !== categoriaId);

    setSelectedCategories(updatedCategories);
    onFilterChange(updatedCategories, selectedPriceRanges, selectedRating);
  };

  const handlePriceChange = (priceRange: string, checked: boolean) => {
    const updatedPriceRanges = checked
      ? [...selectedPriceRanges, priceRange]
      : selectedPriceRanges.filter((range) => range !== priceRange);

    setSelectedPriceRanges(updatedPriceRanges);
    onFilterChange(selectedCategories, updatedPriceRanges, selectedRating);
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating);
    onFilterChange(selectedCategories, selectedPriceRanges, rating);
  };

  const handleShowPopular = () => onShowPopular();

  const productosConDescuento = productos
    .filter((producto) => producto.descuento > 0)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return (
    <>
      {/* Hamburger Menu for Mobile */}
      <button
        className="block sm:hidden text-gray-600 p-4 focus:outline-none"
        onClick={toggleSidebar}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed sm:static top-0 left-0 h-full sm:h-auto bg-white shadow-md border-r border-gray-300 overflow-y-auto transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0 w-64 sm:w-full p-4 space-y-6 z-50`}
      >
        {/* Search Bar */}
        <div className="relative mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Buscar..."
            className="w-full px-4 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <button className="absolute top-0 right-0 h-full w-10 flex items-center justify-center bg-gray-300 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 4a7 7 0 100 14 7 7 0 000-14zm0 0l6 6"
              />
            </svg>
          </button>
        </div>

        {/* Filters */}
        <h2 className="font-bold text-2xl mb-2">Filtros</h2>

        {/* Categories */}
        <div>
          <h3 className="font-semibold text-lg">Categorías</h3>
          <ul className="space-y-2 mt-2">
            {categorias.map((categoria) => (
              <li key={categoria.id}>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    onChange={(e) => handleCategoryChange(categoria.id, e.target.checked)}
                  />
                  {categoria.nombre}
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Price */}
        <div>
          <h3 className="font-semibold text-lg">Precio</h3>
          <ul className="space-y-2 mt-2">
            <li>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  onChange={(e) => handlePriceChange('menos100', e.target.checked)}
                />
                Menos de $100
              </label>
            </li>
            {/* Add more price ranges as needed */}
          </ul>
        </div>

        {/* Rating */}
        <div>
          <h3 className="font-semibold text-lg">Calificación</h3>
          <ul className="space-y-2 mt-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <li key={rating}>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="rating"
                    className="mr-2"
                    onChange={() => handleRatingChange(rating)}
                  />
                  {Array(rating)
                    .fill(0)
                    .map((_, i) => (
                      <span key={i} className="text-yellow-500">&#9733;</span>
                    ))}
                </label>
              </li>
            ))}
          </ul>
        </div>

         {/* Populares */}
         <div className="space-y-4">
                <h2 className="flex w-full text-2xl font-bold mb-4">Populares </h2>
                <ul className="mb-8 flex flex-wrap gap-2">
                    {['Top', 'Fashion', 'Colección', 'Nuevo', 'Lo mejor', 'Galería'].map((item, index) => (
                        <li key={index}>
                            <button className="text-center bg-white py-2 px-4 shadow-sm hover:bg-gray-100" onClick={handleShowPopular}>
                                {item}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <hr className="border-gray-400 my-2" />

            {/* Productos nuevos */}
            <div className="space-y-4">
                <h2 className="flex w-full text-2xl font-bold mb-4">Ofertas </h2>
                <div className="space-y-4">
                    
                    <ProductCardDiscount productos={productosConDescuento} />
                    
                </div>
                {/* <button className="mt-4 text-blue-500 hover:underline">Mostrar más</button> */}
            </div>
        </aside>
    

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
