"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import PocketBase from "pocketbase";

const pb = new PocketBase("https://kevinklein.pockethost.io");

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState(null);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await pb.authStore.model;
        setUser(userResponse);

        const addressResponse = await pb
          .collection("shippingaddresses")
          .getFullList(1, { filter: `id_user="${userResponse.id}"` });

        setAddress(addressResponse.length ? addressResponse[0] : null);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleUserSave = async () => {
    try {
      await pb.collection("users").update(user.id, user);
      alert("Perfil actualizado con éxito.");
      setIsEditingUser(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleAddressSave = async () => {
    try {
      if (address?.id) {
        await pb.collection("shippingaddresses").update(address.id, address);
      } else {
        await pb.collection("shippingaddresses").create({
          ...address,
          id_user: user.id,
        });
      }
      alert("Dirección actualizada con éxito.");
      setIsEditingAddress(false);
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* User Section */}
          {user && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-4 mb-6">
                <Image
                  src={
                    user.avatar
                      ? `${pb.baseUrl}/api/files/users/${user.id}/${user.avatar}`
                      : "/img/generic_img.png"
                  }
                  alt="User Avatar"
                  width={100}
                  height={100}
                  className="rounded-full object-cover"
                />
                <div>
                  <h1 className="text-xl font-bold text-black">
                    {user.name || "Sin Nombre"}
                  </h1>
                  <p className="text-black">@{user.username}</p>
                  <p className="text-black">{user.email}</p>
                  <p className="text-black">Rol: {user.rol}</p>
                </div>
              </div>
              {isEditingUser ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-black">Nombre</label>
                    <input
                      type="text"
                      value={user.name || ""}
                      onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-md p-2 text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-black">Usuario</label>
                    <input
                      type="text"
                      value={user.username || ""}
                      onChange={(e) =>
                        setUser({ ...user, username: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-md p-2 text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-black">Correo Electrónico</label>
                    <input
                      type="email"
                      value={user.email || ""}
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-md p-2 text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-black">Avatar</label>
                    <input
                      type="file"
                      onChange={(e) =>
                        setUser({
                          ...user,
                          avatar: e.target.files?.[0],
                        })
                      }
                      className="block w-full text-black"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={handleUserSave}
                      className="bg-green-600 text-white px-4 py-2 rounded-md"
                    >
                      Guardar Cambios
                    </button>
                    <button
                      onClick={() => setIsEditingUser(false)}
                      className="bg-red-600 text-white px-4 py-2 rounded-md"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditingUser(true)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md"
                >
                  Editar Usuario
                </button>
              )}
            </div>
          )}

          {/* Address Section */}
          {address && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-black mb-4">Dirección</h2>
              {!isEditingAddress ? (
                <div className="space-y-2">
                  <p className="text-black">
                    <strong>Nombre de la Dirección:</strong> {address.nombre_direccion || "Sin Nombre"}
                  </p>
                  <p className="text-black">
                    <strong>Dirección:</strong> {address.direccion || "No proporcionado"}
                  </p>
                  <p className="text-black">
                    <strong>Ciudad:</strong> {address.ciudad || "No proporcionado"}
                  </p>
                  <p className="text-black">
                    <strong>Estado:</strong> {address.estado || "No proporcionado"}
                  </p>
                  <p className="text-black">
                    <strong>País:</strong> {address.pais || "No proporcionado"}
                  </p>
                  <p className="text-black">
                    <strong>Código Postal:</strong> {address.codigo_postal || "No proporcionado"}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-black">Nombre de la Dirección</label>
                    <input
                      type="text"
                      value={address.nombre_direccion || ""}
                      onChange={(e) =>
                        setAddress({
                          ...address,
                          nombre_direccion: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-md p-2 text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-black">Dirección</label>
                    <input
                      type="text"
                      value={address.direccion || ""}
                      onChange={(e) =>
                        setAddress({ ...address, direccion: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-md p-2 text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-black">Ciudad</label>
                    <input
                      type="text"
                      value={address.ciudad || ""}
                      onChange={(e) =>
                        setAddress({ ...address, ciudad: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-md p-2 text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-black">Estado</label>
                    <input
                      type="text"
                      value={address.estado || ""}
                      onChange={(e) =>
                        setAddress({ ...address, estado: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-md p-2 text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-black">País</label>
                    <input
                      type="text"
                      value={address.pais || ""}
                      onChange={(e) =>
                        setAddress({ ...address, pais: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-md p-2 text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-black">Código Postal</label>
                    <input
                      type="text"
                      value={address.codigo_postal || ""}
                      onChange={(e) =>
                        setAddress({
                          ...address,
                          codigo_postal: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-md p-2 text-black"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={handleAddressSave}
                      className="bg-green-600 text-white px-4 py-2 rounded-md"
                    >
                      Guardar Cambios
                    </button>
                    <button
                      onClick={() => setIsEditingAddress(false)}
                      className="bg-red-600 text-white px-4 py-2 rounded-md"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
              {!isEditingAddress && (
                <button
                  onClick={() => setIsEditingAddress(true)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md mt-4"
                >
                  Editar Dirección
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
