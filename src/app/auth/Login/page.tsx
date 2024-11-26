"use client"
import React, { useState } from 'react';
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";
import PocketBase from 'pocketbase';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const pb = new PocketBase('https://kevinklein.pockethost.io');
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [loginError, setLoginError] = useState('');
    const router = useRouter(); 

    const validateInputs = () => {
        let isValid = true;
        const newErrors = { email: '', password: '' };

        if (!email) {
            newErrors.email = 'El correo electrónico es obligatorio.';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Por favor, ingresa un correo electrónico válido.';
            isValid = false;
        }

        if (!password) {
            newErrors.password = 'La contraseña es obligatoria.';
            isValid = false;
        } else if (password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateInputs()) return;

        try {
            await pb.collection('users').authWithPassword(email, password);
            if(pb.authStore.isValid){ //si el usuario está registrado en la base de datos, se redirige al 
                //panel de administrador
                router.push('/hombre');
                
                }else{
                alert("No se pudo iniciar sesion")
                console.log(pb.authStore.isValid);
            }
            console.log('Usuario autenticado:');
            console.log('Token:', pb.authStore.token);
            console.log('ID del usuario:', pb.authStore.model?.id);
            setLoginError('');
            // Redirige al usuario o actualiza la UI tras el inicio de sesión exitoso.
        } catch (err) {
            console.error('Error al iniciar sesión:', err);
            setLoginError('Correo electrónico o contraseña incorrectos.');
        }
    };

    return (
        <>
            <div className="bg-black">
                <Navbar />
            </div>
            <div className="!bg-custom-logreg bg-cover h-auto w-auto">
                <div className="flex min-h-full flex-1 flex-row justify-center px-6 py-36 lg:px-8">
                    <div className="w-full lg:max-w-lg sm:max-w-sm md:max-w-md p-4 bg-white bg-opacity-95 border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <h5 className="text-3xl/9 font-semibold text-[#173C86] font-poppins text-center">Iniciar sesión</h5>
                            {loginError && (
                                <p className="text-sm text-red-600 text-center">{loginError}</p>
                            )}
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Correo electrónico
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`bg-gray-50 border ${
                                        errors.email ? 'border-red-500' : 'border-gray-300'
                                    } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                                    placeholder="name@company.com"
                                />
                                {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className={`bg-gray-50 border ${
                                        errors.password ? 'border-red-500' : 'border-gray-300'
                                    } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                                />
                                {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Iniciar sesión
                            </button>
                            <button
                                type="button"
                                className="flex w-full items-center justify-center bg-white dark:bg-gray-900 border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                                <svg
                                    className="h-6 w-6 mr-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="800px"
                                    height="800px"
                                    viewBox="-0.5 0 48 48"
                                    version="1.1"
                                >
                                    <title>Google-color</title>
                                    <desc>Created with Sketch.</desc>
                                    <defs> </defs>
                                    <g
                                        id="Icons"
                                        stroke="none"
                                        strokeWidth="1"
                                        fill="none"
                                        fillRule="evenodd"
                                    >
                                        <g id="Color-" transform="translate(-401.000000, -860.000000)">
                                            <g id="Google" transform="translate(401.000000, 860.000000)">
                                                <path
                                                    d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                                                    id="Fill-1"
                                                    fill="#FBBC05"
                                                ></path>
                                                <path
                                                    d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                                                    id="Fill-2"
                                                    fill="#EB4335"
                                                ></path>
                                                <path
                                                    d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                                                    id="Fill-3"
                                                    fill="#34A853"
                                                ></path>
                                                <path
                                                    d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                                                    id="Fill-4"
                                                    fill="#4285F4"
                                                ></path>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                                <span>Iniciar sesión con Google</span>
                            </button>
                            <div className="text-sm font-medium text-center text-gray-500 dark:text-gray-300">
                                ¿No tienes una cuenta?{' '}
                                <a href="/auth/Register" className="text-blue-700 hover:underline dark:text-blue-500">
                                    Registrate
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default LoginPage;
