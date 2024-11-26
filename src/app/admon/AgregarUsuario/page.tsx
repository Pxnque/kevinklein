"use client";

import { useState } from "react";
import { Sidebar } from "../../components/Sidebaradmon/Sidebaradmon";
import { Header } from "../../components/HeaderAdmon/HeaderAdmon";


export default function AgregarUsuarioPage() {
  const [showPassword] = useState(false);



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
                {/* Username */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2 text-sm text-black"
                    placeholder="Ingrese el nombre de usuario"
                  />
                </div>

                {/* Nombre */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2 text-sm text-black"
                    placeholder="Ingrese el nombre completo"
                  />
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded-md p-2 text-sm text-black"
                    placeholder="Ingrese el correo electrónico"
                  />
                </div>

                {/* Avatar */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Avatar</label>
                  <div className="flex items-center justify-center border border-gray-300 rounded-lg p-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-gray-400 mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <span className="text-gray-500">Arrastra una foto o haz clic para subir</span>
                  </div>
                </div>

                {/* Contraseña */}
                <div className="mb-6 relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full border border-gray-300 rounded-md p-2 text-sm text-black pr-10"
                    placeholder="Ingrese la contraseña"
                  />

                </div>

                {/* Botón de Añadir */}
                <div className="flex justify-center">
                  <button className="flex items-center bg-green-600 text-white px-4 py-2 rounded-md text-sm">
                    Añadir Usuario
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
