"use client"

import { useState } from 'react';
import { Sidebar } from "../../components/Sidebaradmon/Sidebaradmon";
import { Header } from "../../components/HeaderAdmon/HeaderAdmon";

export default function ConfiguracionPage() {
    const [activeTab, setActiveTab] = useState('informacion')

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="flex flex-col w-full">
                <Header />
                <div className="flex flex-1">
                    <Sidebar />
                    <main className="flex-1 p-6 overflow-y-auto">
                        <div className="max-w-[1200px]">
                            <h1 className="text-2xl font-semibold text-gray-900 mb-6">
                                Configuración
                            </h1>

                            {/* White Container */}
                            <div className="bg-white rounded-lg shadow-sm">
                                {/* Tabs Navigation */}
                                <div className="border-b">
                                    <div className="flex space-x-8 px-6">
                                        <button 
                                            onClick={() => setActiveTab('informacion')}
                                            className={`py-4 text-sm relative ${
                                                activeTab === 'informacion' 
                                                    ? 'text-blue-600 border-b-2 border-blue-600 -mb-[2px]' 
                                                    : 'text-gray-500'
                                            }`}
                                        >
                                            Información
                                        </button>
                                        <button className="py-4 text-sm text-gray-500">Ubicación</button>
                                        <button className="py-4 text-sm text-gray-500">Pagos</button>
                                        <button className="py-4 text-sm text-gray-500">Envíos</button>
                                        <button className="py-4 text-sm text-gray-500">Mejores Productos</button>
                                        <button className="py-4 text-sm text-gray-500">Servicios</button>
                                    </div>
                                </div>

                                <div className="p-6 space-y-6">
                                    {/* Header de Tienda */}
                                    <div className="bg-white rounded-lg">
                                        <div className="flex justify-between items-center mb-4">
                                            <h2 className="text-lg text-gray-900">Header de Tienda</h2>
                                            <button className="text-blue-600 text-sm">
                                                Editar
                                            </button>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg h-48"></div>
                                    </div>

                                    {/* Three Column Layout */}
                                    <div className="grid grid-cols-3 gap-6">
                                        {/* Información de la tienda */}
                                        <div className="bg-white rounded-lg">
                                            <div className="flex justify-between items-center mb-4">
                                                <h2 className="text-lg text-gray-900">Información de la tienda</h2>
                                                <button className="text-blue-600 text-sm">
                                                    Editar
                                                </button>
                                            </div>
                                            <div className="space-y-4">
                                                <div>
                                                    <h3 className="text-sm text-gray-500">Nombre de Tienda</h3>
                                                    <p className="mt-1">Kevin Klein</p>
                                                </div>
                                                <div>
                                                    <h3 className="text-sm text-gray-500">Slogan</h3>
                                                    <p className="mt-1">Ropa para no jodidos</p>
                                                </div>
                                                <div>
                                                    <h3 className="text-sm text-gray-500">Descripción</h3>
                                                    <p className="mt-1 text-gray-600">
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Verificación */}
                                        <div className="bg-white rounded-lg">
                                            <div className="flex justify-between items-center mb-4">
                                                <h2 className="text-lg text-gray-900">Verificación</h2>
                                                <button className="text-blue-600 text-sm">
                                                    Editar
                                                </button>
                                            </div>
                                            <div className="space-y-4">
                                                <div>
                                                    <h3 className="text-sm text-gray-500">Correo Electrónico</h3>
                                                    <p className="mt-1">shoobothoo@gmail.com</p>
                                                </div>
                                                <div>
                                                    <h3 className="text-sm text-gray-500">Teléfono</h3>
                                                    <p className="mt-1">+52 7878 9090</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Estado de Tienda */}
                                        <div className="bg-white rounded-lg">
                                            <div className="flex justify-between items-center mb-4">
                                                <h2 className="text-lg text-gray-900">Estado de Tienda</h2>
                                                <button className="text-blue-600 text-sm">
                                                    Editar
                                                </button>
                                            </div>
                                            <div className="space-y-4">
                                                <div>
                                                    <h3 className="text-sm text-gray-500">Estado de Tienda</h3>
                                                    <p className="mt-1">Tienda Abierta</p>
                                                </div>
                                                <div>
                                                    <h3 className="text-sm text-gray-500">Tienda Abierta</h3>
                                                    <p className="mt-1">Lun - Vie</p>
                                                    <p className="text-gray-500">8 AM - 5 PM</p>
                                                </div>
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