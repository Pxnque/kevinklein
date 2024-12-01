"use client";

import React, { useEffect, useState } from "react";
import { Sidebar } from "../../components/Sidebaradmon/Sidebaradmon";
import { Header } from "../../components/HeaderAdmon/HeaderAdmon";
import PocketBase from "pocketbase";


// Instancia de PocketBase
const pb = new PocketBase("https://kevinklein.pockethost.io");


interface Reseña {
  id: string;
  producto: string;
  usuario: string;
  calificacion: number;
  comentario: string;
}

const ResenasPage: React.FC = () => {
  const [reseñas, setReseñas] = useState<Reseña[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviews = await pb.collection("product_reviews").getFullList(100, {
          expand: "user_id,product_id",
        });

        const formattedReviews = reviews.map((review: any) => ({
          id: review.id,
          producto: review.expand?.product_id?.nombre || "Producto desconocido",
          usuario: review.expand?.user_id?.name || review.user_id, // Muestra el campo `user_id` si no hay un usuario relacionado
          calificacion: review.rating,
          comentario: review.comment,
        }));

        setReseñas(formattedReviews);
      } catch (error) {
        console.error("Error al cargar reseñas:", error);
      }
    };

    fetchReviews();
  }, []);

  // Filtrar reseñas por término de búsqueda
  const filteredReseñas = reseñas.filter(
    (reseña) =>
      reseña.producto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reseña.comentario.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex flex-col w-full">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6 overflow-y-auto bg-gray-100">
            <div className="max-w-[1200px] mx-auto">
              <h1 className="text-4xl font-bold text-gray-800 mb-8">
                Reseñas de Productos
              </h1>

              {/* Buscador */}
              <div className="mb-4 flex items-center">
                <input
                  type="text"
                  placeholder="Buscar por nombre del producto o comentario..."
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
                      <th className="px-6 py-3 border-b">Nombre del Producto</th>
                      <th className="px-6 py-3 border-b">Usuario</th>
                      <th className="px-6 py-3 border-b">Calificación</th>
                      <th className="px-6 py-3 border-b">Comentario</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReseñas.map((reseña) => (
                      <tr
                        key={reseña.id}
                        className="hover:bg-gray-50 text-gray-700"
                      >
                        <td className="px-6 py-4 border-b">{reseña.id}</td>
                        <td className="px-6 py-4 border-b">{reseña.producto}</td>
                        <td className="px-6 py-4 border-b">{reseña.usuario}</td>
                        <td className="px-6 py-4 border-b">
                          {"★".repeat(reseña.calificacion) +
                            "☆".repeat(5 - reseña.calificacion)}
                        </td>
                        <td className="px-6 py-4 border-b">
                          {reseña.comentario}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredReseñas.length === 0 && (
                  <p className="text-center text-gray-500 mt-4">
                    No se encontraron resultados.
                  </p>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ResenasPage;
