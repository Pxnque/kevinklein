// components/Sidebar.tsx
import React from 'react';
import { useEffect, useState } from 'react';
import pb from '@/app/lib/pocketbase'; // Importa tu cliente de PocketBase
import ProductCardDiscount from '../CardDiscount/ProductCardDiscount';
import { FaArrowDown, FaSortDown, FaSort, FaAngleDown } from 'react-icons/fa';

// Tipo para las categorías
interface Categoria {
    id: string;
    nombre: string;
}

// Tipo para los productos
interface Producto {
    id: string;
    nombre: string;
    url: string;
    precio: number;
    descuento: number;
}

// Props del Sidebar
interface SidebarProps {
    productos: Producto[];
    categorias: Categoria[];
    onFilterChange: (selectedCategories: string[], selectedPriceRanges: string[], rating: number | null) => void; // Función para manejar filtros
    onShowPopular: () => void;
    onSearch: (searchTerm: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ productos, categorias, onFilterChange, onShowPopular, onSearch }) => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Manejar el cambio en la barra de búsqueda
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value); // Comunicar el término al padre
    };

    // Seleccionar 3 productos aleatorios con descuento > 0
    const productosConDescuento = productos
        .filter((producto) => producto.descuento > 0)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

    // Manejar cambios en las categorías seleccionadas
    const handleCategoryChange = (categoriaId: string, checked: boolean) => {
        const updatedCategories = checked
            ? [...selectedCategories, categoriaId]
            : selectedCategories.filter((id) => id !== categoriaId);

        setSelectedCategories(updatedCategories);
        onFilterChange(updatedCategories, selectedPriceRanges, selectedRating); // Comunicar cambios
    };

    // Manejar cambios en los rangos de precios seleccionados
    const handlePriceChange = (priceRange: string, checked: boolean) => {
        const updatedPriceRanges = checked
            ? [...selectedPriceRanges, priceRange]
            : selectedPriceRanges.filter((range) => range !== priceRange);

        setSelectedPriceRanges(updatedPriceRanges);
        onFilterChange(selectedCategories, updatedPriceRanges, selectedRating); // Comunicar cambios
    };

    // Manejar cambios en la calificación seleccionada
    const handleRatingChange = (rating: number) => {
        setSelectedRating(rating);
        onFilterChange(selectedCategories, selectedPriceRanges, rating); // Comunicar calificación al padre
    };

    const handleShowPopular = () => {
        onShowPopular(); // Llama a la función pasada desde el padre
    };

    return (
        <aside className="w-full p-4 bg-white shadow-md text-black  border-r border-gray-300 min-h-screen overflow-y-auto flex flex-col space-y-6">
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
            <h2 className="font-bold text-2xl mb-2">Filtros</h2>

            {/* Categorías */}
            <div className="space-y-4">
                <h3 className="flex w-full font-semibold text-lg">Categorías</h3>
                <ul className="mt-2 space-y-2">
                    {categorias.length > 0 ? (
                        categorias.map((categoria) => (
                            <li key={categoria.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={categoria.nombre.toLowerCase().replace(/\s+/g, '-')}
                                    className="mr-2"
                                    onChange={(e) => handleCategoryChange(categoria.id, e.target.checked)}
                                />
                                <label htmlFor={categoria.nombre.toLowerCase().replace(/\s+/g, '-')}>
                                    {categoria.nombre}
                                </label>
                            </li>
                        ))
                    ) : (
                        <p>Cargando categorías...</p>
                    )}
                </ul>
                {/* <a href="#" className="text-blue-600 mt-4 inline-block">Mostrar más</a> */}
            </div>
            <hr className="border-gray-400 my-2" />

            {/* Precio */}
            <div className="space-y-4 mt-6">
                <h3 className="flex w-full font-semibold text-lg">Precio</h3>
                <ul className="mt-2 space-y-2">
                    <li className="flex items-center">
                        <input
                            type="checkbox"
                            id="menos100"
                            className="mr-2"
                            onChange={(e) => handlePriceChange('menos100', e.target.checked)}
                        />
                        <label htmlFor="menos100">Menos de $100</label>
                    </li>
                    <li className="flex items-center">
                        <input
                            type="checkbox"
                            id="100-250"
                            className="mr-2"
                            onChange={(e) => handlePriceChange('100-250', e.target.checked)}
                        />
                        <label htmlFor="100-250">$100 - $250</label>
                    </li>
                    <li className="flex items-center">
                        <input
                            type="checkbox"
                            id="250-350"
                            className="mr-2"
                            onChange={(e) => handlePriceChange('250-350', e.target.checked)}
                        />
                        <label htmlFor="250-350">$250 - $350</label>
                    </li>
                    <li className="flex items-center">
                        <input
                            type="checkbox"
                            id="mas500"
                            className="mr-2"
                            onChange={(e) => handlePriceChange('mas500', e.target.checked)}
                        />
                        <label htmlFor="mas500">Mayor de $500</label>
                    </li>
                </ul>
            </div>
            <hr className="border-gray-400 my-2" />

            {/* Calificación */}
            <div className="space-y-4">
                <h3 className="flex w-full font-semibold text-lg">Calificación</h3>
                <ul className="mt-2 space-y-2">
                    {[5, 4, 3, 2, 1, 0].map((rating) => (
                        <li key={rating} className="flex items-center">
                            <input
                                type="radio"
                                name="rating"
                                className="mr-2"
                                onChange={() => handleRatingChange(rating)}
                            />
                            <div className="flex">
                                {Array(rating)
                                    .fill(0)
                                    .map((_, index) => (
                                        <span key={index} className="text-yellow-500">&#9733;</span>
                                    ))}
                                {Array(5 - rating)
                                    .fill(0)
                                    .map((_, index) => (
                                        <span key={index} className="text-gray-300">&#9733;</span>
                                    ))}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <hr className="border-gray-400 my-2" />

            {/* Color NOS deshicimos del color*/}
            {/* <div className="space-y-4">
                <h3 className="flex w-full font-semibold text-lg">Color </h3>
                <ul className="mt-2 space-y-2">
                    {[
                        { id: "blanco", label: "Blanco", color: "bg-gray-200" },
                        { id: "negro", label: "Negro", color: "bg-black" },
                        { id: "azul", label: "Azul", color: "bg-blue-500" },
                        { id: "cafe", label: "Café", color: "bg-yellow-700" },
                        { id: "rojo", label: "Rojo", color: "bg-red-500" },
                        { id: "naranja", label: "Naranja", color: "bg-orange-500" },
                        { id: "amarillo", label: "Amarillo", color: "bg-yellow-500" },
                    ].map(({ id, label, color }) => (
                        <li key={id} className="flex items-center">
                            <input type="checkbox" id={id} className="mr-2" />
                            <label htmlFor={id} className="inline-flex items-center">
                                <span className={`w-4 h-4 ${color} inline-block mr-2`}></span> {label}
                            </label>
                        </li>
                    ))}
                </ul>
                <a href="#" className="text-blue-600 mt-4 inline-block">Mostrar más</a>
            </div>
            <hr className="border-gray-400 my-2" /> */}

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
    );
};

export default Sidebar;
