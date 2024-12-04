"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "../../components/Sidebaradmon/Sidebaradmon";
import { Header } from "../../components/HeaderAdmon/HeaderAdmon";

interface Venta {
  id: string;
  user_id: string;
  shipping_id: string;
  product_id: string;
  quantity: number;
}

export default function VentasPage() {
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Obtener los datos de ventas desde PocketBase
    const fetchVentas = async () => {
      try {
        const res = await fetch("https://kevinklein.pockethost.io/api/collections/sales/records");
        const data = await res.json();
        setVentas(data.items);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };
    fetchVentas();
  }, []);

  // Filtrar solo por el ID de la venta
  const filteredVentas = ventas.filter(
    (venta) => venta.id.toLowerCase().includes(searchTerm.toLowerCase())
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
                  placeholder="Buscar por ID de venta..."
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
                      <th className="px-6 py-3 border-b">Usuario ID</th>
                      <th className="px-6 py-3 border-b">Producto ID</th>
                      <th className="px-6 py-3 border-b">Cantidad</th>
                      <th className="px-6 py-3 border-b">Shipping ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVentas.map((venta) => (
                      <tr key={venta.id} className="hover:bg-gray-50 text-gray-700">
                        <td className="px-6 py-4 border-b">{venta.id}</td>
                        <td className="px-6 py-4 border-b">{venta.user_id}</td>
                        <td className="px-6 py-4 border-b">{venta.product_id}</td>
                        <td className="px-6 py-4 border-b">{venta.quantity}</td>
                        <td className="px-6 py-4 border-b">{venta.shipping_id}</td>
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
