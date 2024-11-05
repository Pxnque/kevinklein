// components/Sidebar.tsx
import React from 'react';
import ProductCard from '../Card/ProductCard';

const Sidebar = () => {
    return (
        <aside className="text-black w-64 p-4 bg-gray-100 border-r border-gray-300 min-h-screen overflow-y-auto flex flex-col space-y-6">
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
                <h3 className="font-semibold text-lg">Categorías</h3>
                <ul className="mt-2 space-y-2">
                    <li className="flex items-center"><input type="checkbox" id="playeras" className="mr-2" /><label htmlFor="playeras">Playeras</label></li>
                    <li className="flex items-center"><input type="checkbox" id="camisas" className="mr-2" /><label htmlFor="camisas">Camisas</label></li>
                    <li className='flex items-center'><input type="checkbox" id="pantalones" className='mr-2' /><label htmlFor="pantalones">Pantalones</label></li>
                    <li className='flex items-center'><input type="checkbox" id="shorts" className='mr-2' /><label htmlFor="shorts">Shorts</label></li>
                    <li className='flex items-center'><input type="checkbox" id="trajes" className='mr-2' /><label htmlFor="trajes">Trajes y Blazers</label></li>
                    <li className='flex items-center'><input type="checkbox" id="sudaderas" className='mr-2' /><label htmlFor="sudaderas">Sudaderas y suéteres</label></li>
                    <li className='flex items-center'><input type="checkbox" id="chamarras" className='mr-2' /><label htmlFor="chamarras">Chamarras y abrigos</label></li>
                    <li className='flex items-center'><input type="checkbox" id="ropa-deportiva" className='mr-2' /><label htmlFor="ropa-deportiva">Ropa deportiva</label></li>
                    <li className='flex items-center'><input type="checkbox" id="ropa-interior" className='mr-2' /><label htmlFor="ropa-interior">Ropa interior</label></li>
                    <li className='flex items-center'><input type="checkbox" id="zapatos" className='mr-2' /><label htmlFor="zapatos">Zapatos</label></li>
                    <li className='flex items-center'><input type="checkbox" id="accesorios" className='mr-2' /><label htmlFor="accesorios">Accesorios</label></li>
                </ul>
                <a href="#" className="text-blue-600 mt-4 inline-block">Mostrar más</a>
            </div>

            {/* Precio */}
            <div className="space-y-4">
                <h3 className="font-semibold text-lg">Precio</h3>
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

            {/* Calificación */}
            <div className="space-y-4">
                <h3 className="font-semibold text-lg">Calificación</h3>
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

            {/* Color */}
            <div className="space-y-4">
                <h3 className="font-semibold text-lg">Color</h3>
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

            {/* Populares */}
            <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Populares</h2>
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


            {/* Productos nuevos */}
            <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Productos nuevos</h2>
                <div className="space-y-4">
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
                <button className="mt-4 text-blue-500 hover:underline">Mostrar más</button>
            </div>
        </aside>
    );
};

export default Sidebar;
