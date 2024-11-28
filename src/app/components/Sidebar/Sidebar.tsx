// components/Sidebar.tsx
import React from 'react';
import { useEffect, useState } from 'react';
import pb from '@/app/lib/pocketbase'; // Importa tu cliente de PocketBase
import ProductCardDiscount from '../CardDiscount/ProductCardDiscount';
import { FaArrowDown, FaSortDown, FaSort, FaAngleDown } from 'react-icons/fa';

// Define el tipo de los objetos de categoría que esperas de PocketBase
interface Categoria {
    id: string;
    nombre: string;
}

const Sidebar = () => {

    // Declara el tipo de estado de categorias como un array de objetos Categoria
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    // Obtener las categorías de la base de datos PocketBase
    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const data = await pb.collection('categorias').getList(1, 20); // Ajusta según tus necesidades

                // Mapear los elementos para convertirlos al tipo Categoria
                const categoriasData = data.items.map((item) => ({
                    id: item.id,  // Asumiendo que 'id' está presente
                    nombre: item.nombre,  // Asumiendo que 'nombre' está presente
                }));

                setCategorias(categoriasData);
            } catch (error) {
                console.error('Error al obtener las categorías:', error);
            }
        };

        fetchCategorias();
    }, []);

    return (
        <aside className="w-full p-4 bg-white shadow-md text-black  border-r border-gray-300 min-h-screen overflow-y-auto flex flex-col space-y-6">
            {/* Search Bar */}
            <div className="relative mb-4">
                <input
                    type="text"
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a7 7 0 100 14 7 7 0 000-14zm0 0l6 6" />
                    </svg>
                </button>
            </div>

            <h2 className="font-bold text-2xl mb-2">Filtros</h2>

            {/* Categorías */}
            <div className="space-y-4">
                <h3 className="flex w-full font-semibold text-lg">Categorías <FaAngleDown className="-left-full mt-2 w-3 h-3" /></h3>
                <ul className="mt-2 space-y-2">
                    {categorias.length > 0 ? (
                        categorias.map((categoria) => (
                            <li key={categoria.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={categoria.nombre.toLowerCase().replace(/\s+/g, '-')}
                                    className="mr-2"
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
                <a href="#" className="text-blue-600 mt-4 inline-block">Mostrar más</a>
            </div>
            <hr className="border-gray-400 my-2" />

            {/* Precio */}
            <div className="space-y-4">
                <h3 className="flex w-full font-semibold text-lg">Precio <FaAngleDown className='-left-full mt-2 w-3 h-3' /></h3>
                <ul className="mt-2 space-y-2">
                    <li className="flex items-center">
                        <input type="checkbox" id="menos50" className="mr-2" />
                        <label htmlFor="menos50">Menos de $50</label>
                    </li>
                    <li className="flex items-center">
                        <input type="checkbox" id="100-250" className="mr-2" />
                        <label htmlFor="100-250">$100 - $250</label>
                    </li>
                    <li className="flex items-center">
                        <input type="checkbox" id="250-350" className="mr-2" />
                        <label htmlFor="250-350">$250 - $350</label>
                    </li>
                    <li className="flex items-center">
                        <input type="checkbox" id="mas500" className="mr-2" />
                        <label htmlFor="mas500">Mayor de $500</label>
                    </li>
                </ul>
                <a href="#" className="text-blue-600 mt-4 inline-block">Mostrar más</a>
            </div>
            <hr className="border-gray-400 my-2" />

            {/* Calificación */}
            <div className="space-y-4">
                <h3 className="flex w-full font-semibold text-lg">Calificación <FaAngleDown className='-left-full mt-2 w-3 h-3' /></h3>
                <ul className="mt-2 space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                        <li key={rating} className="flex items-center">
                            <input type="radio" name="rating" className="mr-2" />
                            <div className="flex">
                                {Array(rating).fill(0).map((_, index) => (
                                    <span key={index} className="text-yellow-500">&#9733;</span>
                                ))}
                                {Array(5 - rating).fill(0).map((_, index) => (
                                    <span key={index} className="text-gray-300">&#9733;</span>
                                ))}
                            </div>
                        </li>
                    ))}
                </ul>
                <a href="#" className="text-blue-600 mt-4 inline-block">Mostrar más</a>
            </div>
            <hr className="border-gray-400 my-2" />

            {/* Color */}
            <div className="space-y-4">
                <h3 className="flex w-full font-semibold text-lg">Color <FaAngleDown className='-left-full mt-2 w-3 h-3' /></h3>
                <ul className="mt-2 space-y-2">
                    <li className="flex items-center">
                        <input type="checkbox" id="blanco" className="mr-2" />
                        <label htmlFor="blanco">
                            <span className="w-4 h-4 bg-gray-200 inline-block mr-2"></span> Blanco
                        </label>
                    </li>
                    <li className="flex items-center">
                        <input type="checkbox" id="negro" className="mr-2" />
                        <label htmlFor="negro" className="inline-flex items-center">
                            <span className="w-4 h-4 bg-black inline-block mr-2"></span> Negro
                        </label>
                    </li>
                    <li className="flex items-center">
                        <input type="checkbox" id="azul" className="mr-2" />
                        <label htmlFor="azul" className="inline-flex items-center">
                            <span className="w-4 h-4 bg-blue-500 inline-block mr-2"></span> Azul
                        </label>
                    </li>
                    <li className="flex items-center">
                        <input type="checkbox" id="cafe" className="mr-2" />
                        <label htmlFor="cafe" className="inline-flex items-center">
                            <span className="w-4 h-4 bg-yellow-700 inline-block mr-2"></span> Café
                        </label>
                    </li>
                    <li className="flex items-center">
                        <input type="checkbox" id="rojo" className="mr-2" />
                        <label htmlFor="rojo" className="inline-flex items-center">
                            <span className="w-4 h-4 bg-red-500 inline-block mr-2"></span> Rojo
                        </label>
                    </li>
                    <li className="flex items-center">
                        <input type="checkbox" id="naranja" className="mr-2" />
                        <label htmlFor="naranja" className="inline-flex items-center">
                            <span className="w-4 h-4 bg-orange-500 inline-block mr-2"></span> Naranja
                        </label>
                    </li>
                    <li className="flex items-center">
                        <input type="checkbox" id="amarillo" className="mr-2" />
                        <label htmlFor="amarillo" className="inline-flex items-center">
                            <span className="w-4 h-4 bg-yellow-500 inline-block mr-2"></span> Amarillo
                        </label>
                    </li>
                </ul>
                <a href="#" className="text-blue-600 mt-4 inline-block">Mostrar más</a>
            </div>
            <hr className="border-gray-400 my-2" />

            {/* Populares */}
            <div className="space-y-4">
                <h2 className="flex w-full text-2xl font-bold mb-4">Populares <FaAngleDown className='-left-full mt-2 w-3 h-3' /></h2>
                <ul className="mb-8 flex flex-wrap gap-2">
                    {['Top', 'Fashion', 'Hombre', 'Colección', 'Colección de hombre', 'Nuevo', 'Ropa', 'Lo mejor', 'Galería', 'Ropa de hombre'].map((item, index) => (
                        <li key={index}>
                            <button className="text-center bg-white py-2 px-4 shadow-sm hover:bg-gray-100">
                                {item}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <hr className="border-gray-400 my-2" />

            {/* Productos nuevos */}
            <div className="space-y-4">
                <h2 className="flex w-full text-2xl font-bold mb-4">Productos nuevos <FaAngleDown className='-left-full mt-2 w-3 h-3' /></h2>
                <div className="space-y-4">
                    <ProductCardDiscount />
                    <ProductCardDiscount />
                    <ProductCardDiscount />
                </div>
                <button className="mt-4 text-blue-500 hover:underline">Mostrar más</button>
            </div>
        </aside>
    );
};

export default Sidebar;
