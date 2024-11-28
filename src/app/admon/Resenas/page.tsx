"use client";

import React, { useState } from "react";
import { Sidebar } from "../../components/Sidebaradmon/Sidebaradmon";
import { Header } from "../../components/HeaderAdmon/HeaderAdmon";
import Chatbot from "../../components/Chatbot/Chatbot";

interface Reseña {
  id: string;
  imagen: string;
  nombreProducto: string;
  usuario: string;
  calificacion: number;
  comentario: string;
}

const reseñas: Reseña[] = [
  {
    id: "prod001",
    imagen: "/path/to/image1.jpg",
    nombreProducto: "Headphone Joss",
    usuario: "Juan Pérez",
    calificacion: 5,
    comentario: "Excelente producto, muy recomendable.",
  },
  {
    id: "prod002",
    imagen: "/path/to/image2.jpg",
    nombreProducto: "Speaker Boom",
    usuario: "Ana López",
    calificacion: 4,
    comentario: "Buen sonido, aunque esperaba más potencia.",
  },
  // Agrega más reseñas aquí
];

const ResenasPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrar reseñas por nombre del producto o ID
  const filteredReseñas = reseñas.filter(
    (reseña) =>
      reseña.nombreProducto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reseña.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex flex-col w-full">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6 overflow-y-auto bg-gray-100">
            <div className="max-w-[1200px] mx-auto">
              <h1 className="text-4xl font-bold text-gray-800 mb-8">Reseñas de Productos</h1>

              {/* Buscador */}
              <div className="mb-4 flex items-center">
                <input
                  type="text"
                  placeholder="Buscar por ID o nombre del producto..."
                  className="border border-gray-300 rounded-md p-2 w-full max-w-md text-black focus:outline-none focus:ring focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Tabla de Reseñas */}
              <div className="bg-white shadow-md rounded-lg">
                <table className="min-w-full border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
                      <th className="px-6 py-3 border-b">ID</th>
                      <th className="px-6 py-3 border-b">Imagen</th>
                      <th className="px-6 py-3 border-b">Producto</th>
                      <th className="px-6 py-3 border-b">Usuario</th>
                      <th className="px-6 py-3 border-b">Calificación</th>
                      <th className="px-6 py-3 border-b">Comentario</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReseñas.map((reseña) => (
                      <tr key={reseña.id} className="hover:bg-gray-50 text-gray-700">
                        <td className="px-6 py-4 border-b">{reseña.id}</td>
                        <td className="px-6 py-4 border-b">
                          <img
                            src={reseña.imagen}
                            alt="Producto"
                            className="w-16 h-16 object-cover rounded-md"
                          />
                        </td>
                        <td className="px-6 py-4 border-b">{reseña.nombreProducto}</td>
                        <td className="px-6 py-4 border-b">{reseña.usuario}</td>
                        <td className="px-6 py-4 border-b">{reseña.calificacion} / 5</td>
                        <td className="px-6 py-4 border-b">{reseña.comentario}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredReseñas.length === 0 && (
                  <p className="text-center text-gray-500 mt-4">No se encontraron resultados.</p>
                )}
              </div>
              {/* Componente del Chatbot */}
              <Chatbot />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ResenasPage;
