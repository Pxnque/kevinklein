"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Chatbot from "../components/Chatbot/Chatbot";
import PocketBase from "pocketbase";
import { useRouter } from "next/navigation";

const pb = new PocketBase("https://kevinklein.pockethost.io");

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const isLogged = await pb.authStore.isValid;
      if (!isLogged) {
        router.push('/auth/Login');
      }
    };

    checkAuth();
  }, [router]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await pb.authStore.model;
        
        setUser(userResponse);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
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

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen py-10">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-black mb-6">Mi Perfil</h1>
          <div className="flex items-center gap-8">
            <div className="w-32 h-32">
              <Image
                src={
                  user?.avatar
                    ? `${pb.baseUrl}/api/files/users/${user.id}/${user.avatar}`
                    : "/img/generic_img.png"
                }
                alt="Avatar del usuario"
                width={128}
                height={128}
                className="rounded-full object-cover border"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-black">
                {user?.name || "Sin Nombre"}
              </h2>
              <p className="text-gray-600">@{user?.username}</p>
              <p className="text-gray-600">{user?.email}</p>
              <p className="text-gray-500">Rol: {user?.rol}</p>
            </div>
          </div>

          {isEditingUser ? (
            <div className="mt-8 space-y-4">
              <div>
                <label className="block text-black">Nombre</label>
                <input
                  type="text"
                  value={user?.name || ""}
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
                  value={user?.username || ""}
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
                  value={user?.email || ""}
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
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleUserSave}
                  className="bg-green-600 text-white px-6 py-2 rounded-md"
                >
                  Guardar Cambios
                </button>
                <button
                  onClick={() => setIsEditingUser(false)}
                  className="bg-red-600 text-white px-6 py-2 rounded-md"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsEditingUser(true)}
              className="mt-8 bg-blue-600 text-white px-6 py-2 rounded-md"
            >
              Editar Perfil
            </button>
          )}
        </div>
      </div>
      <Chatbot />
      <Footer />
    </>
  );
}
