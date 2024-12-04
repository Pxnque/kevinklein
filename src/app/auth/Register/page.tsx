"use client"
import React, { useState } from "react";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import PocketBase from "pocketbase";
import bg from "@/app/public/img/logreg.png";

const pb = new PocketBase("https://kevinklein.pockethost.io");

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        username: "",
        rol: "user", // Default role
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [registerError, setRegisterError] = useState("");

    const validateForm = () => {
        const newErrors: any = {};

        if (!formData.name.trim()) newErrors.name = "El nombre es obligatorio.";
        if (!formData.email.trim()) {
            newErrors.email = "El correo electrónico es obligatorio.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "El correo electrónico no es válido.";
        }
        if (!formData.password) {
            newErrors.password = "La contraseña es obligatoria.";
        } else if (formData.password.length < 8) {
            newErrors.password = "La contraseña debe tener al menos 8 caracteres.";
        }
        if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = "Las contraseñas no coinciden.";
        }
        if (!formData.username.trim()) {
            newErrors.username = "El nombre de usuario es obligatorio.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;
    
        // Prepare the data to be sent
        const data = {
            username: formData.username,
            email: formData.email,
            emailVisibility: true, // PocketBase requires this field for email visibility
            password: formData.password,
            passwordConfirm: formData.confirmPassword,
            name: formData.name,
            rol: formData.rol, // Ensure this field exists in your PocketBase schema
        };
    
        console.log("Data to be sent:", data); // Debugging: Log data being sent
    
        try {
            // Attempt to create a new user in the PocketBase `users` collection
            const record = await pb.collection("users").create(data);
            console.log("User created:", record); // Debugging: Log the successful creation response
            alert("Registro exitoso. Ahora puedes iniciar sesión.");
            
            // Reset form fields after successful registration
            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                username: "",
                rol: "user",
            });
            setErrors({});
            setRegisterError(""); // Clear any previous errors
        } catch (error: any) {
            console.error("Error creating user:", error); // Debugging: Log the error
    
            // Handle specific error cases if available
            if (error?.data?.data) {
                const fieldErrors: { [key: string]: string } = {};
                for (const [key, value] of Object.entries(error.data.data)) {
                    fieldErrors[key] = value.message;
                }
                setErrors(fieldErrors); // Set field-specific errors
            } else if (error?.message) {
                setRegisterError(error.message); // Display generic error message
            } else {
                setRegisterError("Error al registrar usuario. Verifica los datos ingresados.");
            }
        }
    };
    
    return (
        <>
            <div className="bg-black">
                <Navbar />
            </div>
            <div className="bg-custom-logreg bg-cover h-auto w-auto">
                <div className="flex min-h-full flex-1 flex-row justify-center px-6 py-36 lg:px-8">
                    <div className="w-full lg:max-w-lg sm:max-w-sm md:max-w-md p-4 bg-white bg-opacity-95 border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <h5 className="text-3xl/9 font-semibold text-[#173C86] font-poppins text-center">
                                Registrate
                            </h5>

                            {registerError && (
                                <div className="text-red-500 text-sm text-center">{registerError}</div>
                            )}

                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    htmlFor="name"
                                >
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="Bryan Alvarez Facio"
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                            </div>

                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    htmlFor="email"
                                >
                                    Correo electrónico
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="name@company.com"
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>

                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    htmlFor="username"
                                >
                                    Nombre de usuario
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="username123"
                                />
                                {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                            </div>

                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    htmlFor="password"
                                >
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="••••••••"
                                />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                            </div>

                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    htmlFor="confirmPassword"
                                >
                                    Confirmar contraseña
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="••••••••"
                                />
                                {errors.confirmPassword && (
                                    <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Registrarse
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default RegisterPage;
