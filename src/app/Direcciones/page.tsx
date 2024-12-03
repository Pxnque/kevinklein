"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Chatbot from "../components/Chatbot/Chatbot";
import PocketBase from "pocketbase";

const pb = new PocketBase("https://kevinklein.pockethost.io");

interface Address {
  id: string;
  id_user: string;
  nombre_direccion: string;
  direccion: string;
  ciudad: string;
  estado: string;
  pais: string;
  codigo_postal: string;
}

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [newAddress, setNewAddress] = useState<Address | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const user = pb.authStore.model;
        if (user) {
          setUserId(user.id);
          const response = await pb.collection("shippingaddresses").getFullList<Address>(10, {
            filter: `id_user="${user.id}"`,
          });
          setAddresses(response);
        }
      } catch (error) {
        console.error("Error al cargar direcciones:", error);
      }
    };

    fetchAddresses();
  }, []);

  const handleAddAddress = () => {
    setNewAddress({
      id: "",
      id_user: userId,
      nombre_direccion: "",
      direccion: "",
      ciudad: "",
      estado: "",
      pais: "",
      codigo_postal: "",
    });
    setIsAdding(true);
  };

  const handleSaveAddress = async () => {
    try {
      if (newAddress?.id) {
        await pb.collection("shippingaddresses").update(newAddress.id, newAddress);
      } else {
        await pb.collection("shippingaddresses").create(newAddress);
      }
      setIsAdding(false);
      setNewAddress(null);

      // Refresh addresses
      const updatedAddresses = await pb.collection("shippingaddresses").getFullList<Address>(10, {
        filter: `id_user="${userId}"`,
      });
      setAddresses(updatedAddresses);
    } catch (error) {
      console.error("Error al guardar dirección:", error);
    }
  };

  const handleDeleteAddress = async (id: string) => {
    try {
      await pb.collection("shippingaddresses").delete(id);
      setAddresses((prev) => prev.filter((address) => address.id !== id));
    } catch (error) {
      console.error("Error al eliminar dirección:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen py-10 px-6">
        <h1 className="text-3xl font-bold text-center mb-10 text-black">Mis Direcciones</h1>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-all border border-gray-200"
              >
                <h2 className="text-lg font-bold text-black">{address.nombre_direccion || "Sin Nombre"}</h2>
                <p className="text-black">{address.direccion}</p>
                <p className="text-black">{`${address.ciudad}, ${address.estado}`}</p>
                <p className="text-black">{`${address.pais}, ${address.codigo_postal}`}</p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => {
                      setNewAddress(address);
                      setIsAdding(true);
                    }}
                    className="text-blue-600 hover:underline hover:text-blue-800"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteAddress(address.id)}
                    className="text-red-600 hover:underline hover:text-red-800"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={handleAddAddress}
              className="border-dashed border-2 border-gray-400 rounded-lg p-6 flex items-center justify-center text-black hover:bg-gray-100"
            >
              + Agregar Dirección
            </button>
          </div>

          {isAdding && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
                <h2 className="text-xl font-bold mb-4 text-black">
                  {newAddress?.id ? "Editar Dirección" : "Nueva Dirección"}
                </h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Nombre de la Dirección"
                    value={newAddress?.nombre_direccion || ""}
                    onChange={(e) =>
                      setNewAddress((prev) => (prev ? { ...prev, nombre_direccion: e.target.value } : prev))
                    }
                    className="w-full border border-gray-300 rounded-md p-2 text-black"
                  />
                  <input
                    type="text"
                    placeholder="Dirección"
                    value={newAddress?.direccion || ""}
                    onChange={(e) =>
                      setNewAddress((prev) => (prev ? { ...prev, direccion: e.target.value } : prev))
                    }
                    className="w-full border border-gray-300 rounded-md p-2 text-black"
                  />
                  <input
                    type="text"
                    placeholder="Ciudad"
                    value={newAddress?.ciudad || ""}
                    onChange={(e) =>
                      setNewAddress((prev) => (prev ? { ...prev, ciudad: e.target.value } : prev))
                    }
                    className="w-full border border-gray-300 rounded-md p-2 text-black"
                  />
                  <input
                    type="text"
                    placeholder="Estado"
                    value={newAddress?.estado || ""}
                    onChange={(e) =>
                      setNewAddress((prev) => (prev ? { ...prev, estado: e.target.value } : prev))
                    }
                    className="w-full border border-gray-300 rounded-md p-2 text-black"
                  />
                  <input
                    type="text"
                    placeholder="País"
                    value={newAddress?.pais || ""}
                    onChange={(e) =>
                      setNewAddress((prev) => (prev ? { ...prev, pais: e.target.value } : prev))
                    }
                    className="w-full border border-gray-300 rounded-md p-2 text-black"
                  />
                  <input
                    type="text"
                    placeholder="Código Postal"
                    value={newAddress?.codigo_postal || ""}
                    onChange={(e) =>
                      setNewAddress((prev) => (prev ? { ...prev, codigo_postal: e.target.value } : prev))
                    }
                    className="w-full border border-gray-300 rounded-md p-2 text-black"
                  />
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    onClick={() => setIsAdding(false)}
                    className="bg-gray-600 text-white px-4 py-2 rounded-md"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSaveAddress}
                    className="bg-green-600 text-white px-4 py-2 rounded-md"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Chatbot />
      <Footer />
    </>
  );
}
