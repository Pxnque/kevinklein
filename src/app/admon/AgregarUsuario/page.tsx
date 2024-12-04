"use client";

import { useState } from "react";
import { Sidebar } from "../../components/Sidebaradmon/Sidebaradmon";
import { Header } from "../../components/HeaderAdmon/HeaderAdmon";
import PocketBase from "pocketbase";

// Inicializa tu instancia de PocketBase
const pb = new PocketBase("https://kevinklein.pockethost.io");

export default function AgregarUsuarioPage() {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    avatar: null as File | null,
  });
  const [errors, setErrors] = useState({ general: "", avatar: "" });
  const [showPassword, setShowPassword] = useState(false);
  setShowPassword(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validar el tipo de archivo
      const allowedTypes = ["image/jpeg", "image/png", "image/svg+xml", "image/gif"];
      if (!allowedTypes.includes(file.type)) {
        setErrors({ ...errors, avatar: "El tipo de archivo no es permitido. Solo JPG, PNG, SVG o GIF." });
        return;
      }

      // Validar el tamaño del archivo
      const maxSize = 5242880; // 5MB
      if (file.size > maxSize) {
        setErrors({ ...errors, avatar: "El tamaño del archivo excede el límite de 5MB." });
        return;
      }

      setFormData({ ...formData, avatar: file });
      setErrors({ ...errors, avatar: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { username, name, email, password, avatar } = formData;

    if (!username || !name || !email || !password || !avatar) {
      setErrors({ general: "Todos los campos son obligatorios, incluyendo el avatar." });
      return;
    }

    const data = new FormData();
    data.append("username", username);
    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    data.append("passwordConfirm", password);
    data.append("rol", "admin"); // Rol fijo a admin
    data.append("avatar", avatar); // Subida del archivo

    try {
      const response = await pb.collection("users").create(data); // Subida a PocketBase
      console.log("Usuario creado:", response);
      alert("Usuario creado exitosamente");
      setFormData({
        username: "",
        name: "",
        email: "",
        password: "",
        avatar: null,
      });
    } catch (err: any) {
      console.error("Error al crear usuario:", err);
      setErrors({ general: "Ocurrió un error al crear el usuario. Por favor, verifica los datos." });
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

              <div className="bg-white rounded-lg shadow-md p-6">
                {errors.general && (
                  <div className="mb-4 text-red-600 text-sm">{errors.general}</div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Username */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md p-2 text-sm text-black"
                      placeholder="Ingrese el nombre de usuario"
                    />
                  </div>

                  {/* Nombre */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md p-2 text-sm text-black"
                      placeholder="Ingrese el nombre completo"
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md p-2 text-sm text-black"
                      placeholder="Ingrese el correo electrónico"
                    />
                  </div>

                  {/* Avatar */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Avatar</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full border border-gray-300 rounded-md p-2 text-sm text-black"
                    />
                    {errors.avatar && (
                      <p className="text-red-500 text-sm">{errors.avatar}</p>
                    )}
                  </div>

                  {/* Contraseña */}
                  <div className="mb-6 relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md p-2 text-sm text-black pr-10"
                      placeholder="Ingrese la contraseña"
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
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}


