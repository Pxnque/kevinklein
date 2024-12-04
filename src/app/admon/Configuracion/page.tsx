"use client";

import { useState } from "react";
import { Sidebar } from "../../components/Sidebaradmon/Sidebaradmon";
import { Header } from "../../components/HeaderAdmon/HeaderAdmon";

export default function ConfiguracionPage() {
    const [activeTab, setActiveTab] = useState("informacion");

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="flex flex-col w-full">
                <Header />
                <div className="flex flex-1">
                    <Sidebar />
                    <main className="flex-1 p-6 overflow-y-auto">
                        <div className="max-w-[1200px] mx-auto">
                            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Configuración</h1>

                            {/* Navegación de pestañas */}
                            <div className="bg-white border-b shadow-sm rounded-t-lg">
                                <div className="flex space-x-8 px-6 py-4">
                                    <button
                                        onClick={() => setActiveTab("informacion")}
                                        className={`text-sm font-medium ${
                                            activeTab === "informacion"
                                                ? "text-blue-600 border-b-2 border-blue-600"
                                                : "text-gray-500"
                                        }`}
                                    >
                                        Información
                                    </button>
                                    <button className="text-sm font-medium text-gray-500">Ubicación</button>
                                    <button className="text-sm font-medium text-gray-500">Pagos</button>
                                    <button className="text-sm font-medium text-gray-500">Envíos</button>
                                    <button className="text-sm font-medium text-gray-500">Mejores Productos</button>
                                    <button className="text-sm font-medium text-gray-500">Servicios</button>
                                </div>
                            </div>

                            {/* Contenedor de tarjetas */}
                            <div className="bg-white rounded-b-lg shadow-md p-6 mt-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-lg font-medium text-gray-900">Header de Tienda</h2>
                                    <button className="text-blue-600 text-sm">Editar</button>
                                </div>
                                <div className="bg-gray-50 border rounded-lg h-32 flex items-center justify-center">
                                    <span className="text-gray-500">Espacio para Imagen</span>
                                </div>

                                <div className="grid grid-cols-3 gap-6 mt-6">
                                    {/* Información de la tienda */}
                                    <div className="bg-gray-50 border rounded-lg p-4">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-sm font-medium text-gray-900">Información de la tienda</h3>
                                            <button className="text-blue-600 text-sm">Editar</button>
                                        </div>
                                        <div className="space-y-2">
                                            <div>
                                                <p className="text-xs text-gray-500">Nombre de Tienda</p>
                                                <p className="text-sm text-gray-800">Kevin Klein</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Slogan</p>
                                                <p className="text-sm text-gray-800">Ropa para no jodidos</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Descripción</p>
                                                <p className="text-sm text-gray-600">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                                    eiusmod tempor incididunt ut labore.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Verificación */}
                                    <div className="bg-gray-50 border rounded-lg p-4">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-sm font-medium text-gray-900">Verificación</h3>
                                            <button className="text-blue-600 text-sm">Editar</button>
                                        </div>
                                        <div className="space-y-2">
                                            <div>
                                                <p className="text-xs text-gray-500">Correo Electrónico</p>
                                                <p className="text-sm text-gray-800">shoobrothoo@gmail.com</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Teléfono</p>
                                                <p className="text-sm text-gray-800">+62 7878 9090</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Estado de Tienda */}
                                    <div className="bg-gray-50 border rounded-lg p-4">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-sm font-medium text-gray-900">Estado de Tienda</h3>
                                            <button className="text-blue-600 text-sm">Editar</button>
                                        </div>
                                        <div className="space-y-2">
                                            <div>
                                                <p className="text-xs text-gray-500">Estado de Tienda</p>
                                                <p className="text-sm text-gray-800">Tienda Abierta</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Horario</p>
                                                <p className="text-sm text-gray-800">Lun - Vie</p>
                                                <p className="text-sm text-gray-600">8 AM - 9 PM</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
