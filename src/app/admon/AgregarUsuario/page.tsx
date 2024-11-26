"use client";

import { useState } from "react";
import { Sidebar } from "../../components/Sidebaradmon/Sidebaradmon";
import { Header } from "../../components/HeaderAdmon/HeaderAdmon";
import PocketBase from "pocketbase";

const pb = new PocketBase("https://kevinklein.pockethost.io");

export default function AgregarUsuarioPage() {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    avatar: null as File | null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "avatar" && files) {
      setFormData((prev) => ({ ...prev, avatar: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { username, name, email, password, avatar } = formData;

    // Preparar datos para PocketBase
    const data = new FormData();
    data.append("username", username);
    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    data.append("passwordConfirm", password);
    data.append("rol", "admin"); // Rol fijo a admin
    if (avatar) data.append("avatar", avatar);

    try {
      await pb.collection("users").create(data);
      alert("Usuario creado exitosamente");
    } catch (error: any) {
      setErrors({ general: "Error al crear el usuario. Verifica los datos ingresados." });
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex flex-col w-full">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6 overflow-y-auto bg-gray-100">
            <div className="max-w-[600px] mx-auto">
              <div className="mb-6 pt-20 text-center">
                <h1 className="text-4xl font-bold text-gray-800">Añadir Usuario</h1>
              </div>

              <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
                {/* Username */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                  <input
                    type="text"
                    name="username"
                    className="w-full border border-gray-300 rounded-md p-2 text-sm text-black"
                    placeholder="Ingrese el nombre de usuario"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Nombre */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                  <input
                    type="text"
                    name="name"
                    className="w-full border border-gray-300 rounded-md p-2 text-sm text-black"
                    placeholder="Ingrese el nombre completo"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full border border-gray-300 rounded-md p-2 text-sm text-black"
                    placeholder="Ingrese el correo electrónico"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Avatar */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Avatar</label>
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md p-2 text-sm text-black"
                  />
                  <p className="text-xs text-gray-500">Formato permitido: JPG, PNG</p>
                </div>

                {/* Contraseña */}
                <div className="mb-6 relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="w-full border border-gray-300 rounded-md p-2 text-sm text-black pr-10"
                    placeholder="Ingrese la contraseña"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Botón de Añadir */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="flex items-center bg-green-600 text-white px-4 py-2 rounded-md text-sm"
                  >
                    Añadir Usuario
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
