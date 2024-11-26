"use client";

import { useState } from "react";
import { Sidebar } from "../../components/Sidebaradmon/Sidebaradmon";
import { Header } from "../../components/HeaderAdmon/HeaderAdmon";

interface Venta {
  id: string;
  imagen: string;
  nombre: string;
  cantidad: number;
  entrega: string;
  importe: number;
}

const ventas: Venta[] = [
  {
    id: "123450",
    imagen: "/path/to/image.jpg",
    nombre: "Headphone Joss",
    cantidad: 5,
    entrega: "Shoo Phar Mhie, Surabaya Timur JNE, 8918291892",
    importe: 1500,
  },
  {
    id: "123451",
    imagen: "/path/to/image.jpg",
    nombre: "Headphone Joss",
    cantidad: 3,
    entrega: "Shoo Phar Mhie, Surabaya Timur JNE, 8918291892",
    importe: 900,
  },
  // Agrega más elementos aquí
];

export default function VentasPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrar por nombre o ID
  const filteredVentas = ventas.filter(
    (venta) =>
      venta.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venta.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex flex-col w-full">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6 overflow-y-auto bg-gray-100">
            <div className="max-w-[1200px] mx-auto">
              <h1 className="text-4xl font-bold text-gray-800 mb-8">Ventas</h1>

              {/* Buscador */}
              <div className="mb-4 flex items-center">
                <input
                  type="text"
                  placeholder="Buscar por ID o nombre..."
                  className="border border-gray-300 rounded-md p-2 w-full max-w-md text-black focus:outline-none focus:ring focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Tabla de Ventas */}
              <div className="bg-white shadow-md rounded-lg">
                <table className="min-w-full border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
                      <th className="px-6 py-3 border-b">ID</th>
                      <th className="px-6 py-3 border-b">Imagen</th>
                      <th className="px-6 py-3 border-b">Nombre del artículo</th>
                      <th className="px-6 py-3 border-b">Cantidad</th>
                      <th className="px-6 py-3 border-b">Entrega</th>
                      <th className="px-6 py-3 border-b">Importe</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVentas.map((venta) => (
                      <tr key={venta.id} className="hover:bg-gray-50 text-gray-700">
                        <td className="px-6 py-4 border-b">{venta.id}</td>
                        <td className="px-6 py-4 border-b">
                          <img
                            src={venta.imagen}
                            alt="Artículo"
                            className="w-16 h-16 object-cover rounded-md"
                          />
                        </td>
                        <td className="px-6 py-4 border-b">{venta.nombre}</td>
                        <td className="px-6 py-4 border-b">{venta.cantidad}</td>
                        <td className="px-6 py-4 border-b">{venta.entrega}</td>
                        <td className="px-6 py-4 border-b">${venta.importe}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredVentas.length === 0 && (
                  <p className="text-center text-gray-500 mt-4">No se encontraron resultados.</p>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
