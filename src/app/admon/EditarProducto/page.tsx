"use client";

import { Sidebar } from "../../components/Sidebaradmon/Sidebaradmon";
import { Header } from "../../components/HeaderAdmon/HeaderAdmon";
import { useState } from "react";
import { Pencil } from "lucide-react";

export default function EditarProductoPage() {
    const [editable, setEditable] = useState(false);

    const toggleEditable = () => {
        setEditable(!editable);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="flex flex-col w-full">
                <Header />
                <div className="flex flex-1">
                    <Sidebar />
                    <main className="flex-1 p-6 overflow-y-auto bg-gray-100">
                        <div className="max-w-[1200px] mx-auto">
                            {/* Contenedor del Título */}
                            <div className="mb-6 pt-20 flex justify-between items-center">
                                <h1 className="text-4xl font-bold text-center text-gray-800">Editar Producto</h1>
                                <button 
                                    onClick={toggleEditable} 
                                    className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition">
                                    <Pencil className="w-5 h-5 mr-2" />
                                    Editar
                                </button>
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-6">
                                {/* Campos del producto */}
                                <div className="grid grid-cols-2 gap-6 mb-6">
                                    {/* ID del producto (Desplegable) */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">ID</label>
                                        <select
                                            className="w-full border border-gray-300 rounded-md p-2 text-sm text-black"
                                            disabled={!editable}
                                        >
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            {/* Agregar más opciones según sea necesario */}
                                        </select>
                                    </div>

                                    {/* Nombre del producto */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                                        <input
                                            type="text"
                                            className="w-full border border-gray-300 rounded-md p-2 text-sm text-black"
                                            placeholder="Ingrese nombre del producto"
                                            disabled={!editable}
                                        />
                                    </div>
                                </div>

                                {/* Descripción */}
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                                    <textarea
                                        className="w-full border border-gray-300 rounded-md p-2 text-sm text-black"
                                        placeholder="Escribe una descripción del producto"
                                        disabled={!editable}
                                    />
                                </div>

                                {/* Precio y Descuento */}
                                <div className="grid grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Precio</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="w-full border border-gray-300 rounded-md p-2 text-sm text-black"
                                            placeholder="Ingrese el precio"
                                            disabled={!editable}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Descuento</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="w-full border border-gray-300 rounded-md p-2 text-sm text-black"
                                            placeholder="Ingrese el descuento (opcional)"
                                            disabled={!editable}
                                        />
                                    </div>
                                </div>

                                {/* Fotos */}
                                <div className="flex flex-col items-center justify-center border border-gray-300 rounded-lg p-4 mb-6 relative">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-12 w-12 text-gray-400 mb-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>
                                    <span className="text-gray-500">Arrastra tus fotos para subirlas o</span>
                                    <button className="text-blue-600 text-sm">Buscar</button>
                                </div>

                                {/* Tallas, Cantidad y Categoría */}
                                <div className="grid grid-cols-3 gap-6 mb-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Tallas</label>
                                        <input
                                            type="text"
                                            className="w-full border border-gray-300 rounded-md p-2 text-sm text-black"
                                            placeholder="Ejemplo: S, M, L"
                                            disabled={!editable}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Cantidad</label>
                                        <input
                                            type="number"
                                            className="w-full border border-gray-300 rounded-md p-2 text-sm text-black"
                                            placeholder="Ingrese la cantidad disponible"
                                            disabled={!editable}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                                        <input
                                            type="text"
                                            className="w-full border border-gray-300 rounded-md p-2 text-sm text-black"
                                            placeholder="Ingrese la categoría"
                                            disabled={!editable}
                                        />
                                    </div>
                                </div>

                                {/* Botones de acción */}
                                <div className="flex justify-end space-x-4">
                                    <button className="flex items-center bg-green-600 text-white px-4 py-2 rounded-md text-sm">
                                        Guardar Cambios
                                    </button>
                                    <button className="flex items-center bg-red-600 text-white px-4 py-2 rounded-md text-sm">
                                        <span className="font-bold">X</span>
                                        <span className="ml-2">Descartar Cambios</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
