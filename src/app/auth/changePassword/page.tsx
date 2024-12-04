"use client"
import Footer from '@/app/components/Footer/Footer';
import Navbar from '@/app/components/Navbar/Navbar';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import PocketBase from 'pocketbase';




const ChangePassword = () => {
    const pb = new PocketBase('https://kevinklein.pockethost.io');
    var userId = '';
    var oldPassword = '';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // Add state for confirmPassword
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '', confirmPassword: '' });
    const [loginError, setLoginError] = useState('');
    const router = useRouter(); 

    const existeUsuario = async (email: string) => {
        const buscar = email;
        console.log(buscar);
        const record = await pb.collection('users').getFirstListItem(`email="${buscar}"`);
        console.log(record);
        const idusuariobuscar = record.id;
        const record2 = await pb.collection('users').getOne(idusuariobuscar);
        console.log(record2);
        if (record) {
             userId = record.id;
             oldPassword = record.password;
            return true;
        }
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        let hasErrors = false;
        const validationErrors = { email: '', password: '', confirmPassword: '' };
    
        // Validate email
        if (!email) {
            validationErrors.email = 'Por favor, ingresa tu correo electrónico.';
            hasErrors = true;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            validationErrors.email = 'Por favor, ingresa un correo electrónico válido.';
            hasErrors = true;
        }
    
        // Validate password
        if (!password) {
            validationErrors.password = 'Por favor, ingresa una contraseña.';
            hasErrors = true;
        } else if (password.length < 8) {
            validationErrors.password = 'La contraseña debe tener al menos 8 caracteres.';
            hasErrors = true;
        }
    
        // Validate confirmPassword
        if (!confirmPassword) {
            validationErrors.confirmPassword = 'Por favor, confirma tu contraseña.';
            hasErrors = true;
        } else if (password !== confirmPassword) {
            validationErrors.confirmPassword = 'Las contraseñas no coinciden.';
            hasErrors = true;
        }
    
        setErrors(validationErrors);
    
        if (hasErrors) {
            return; // Stop if there are validation errors
        }
        try {
            const exist = await existeUsuario(email);
            if (!exist) {
                alert('El correo electrónico no está registrado.');
                return;
            }
        } catch (error) {
            console.log(error);
        }
        try {
            // Verify user existence and retrieve userId and oldPassword
            const authData = await pb.collection('users').authWithPassword(
                'bolinhaclassic77@outlook.com',
                'contraseña',
            );
            console.log(authData);
            console.log("despues de esto es el authstore.record");
            console.log(pb.authStore.record);
            
            console.log(userId);
            
            
            // Prepare the data for updating the user's 
            const contraseña = password;
            const confirmarContraseña = confirmPassword;
            console.log(contraseña, confirmarContraseña);
           
            const record = await pb.collection('users').update(userId,{
                password: contraseña,
                
            });
    
            // Make the update request to PocketBase
            //const record = await pb.collection('users').update(userId, data);
            if (record) {
                alert('Contraseña cambiada con éxito.');
                pb.authStore.clear();
                router.push('/auth/Login');
            }

    
            // Success feedback
            
            // Reset form fields
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setErrors({ email: '', password: '', confirmPassword: '' });
        } catch (error) {
            console.error(error);
            setLoginError(
                'Error al cambiar la contraseña. Por favor, inténtalo de nuevo más tarde.'
            );
        }
    };
    

    return (
        <div>
            <Navbar />
            <div className="!bg-custom-logreg bg-cover h-auto w-auto">
                <div className="flex min-h-full flex-1 flex-row justify-center px-6 py-36 lg:px-8">
                    <div className="w-full lg:max-w-lg sm:max-w-sm md:max-w-md p-4 bg-white bg-opacity-95 border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <h5 className="text-3xl/9 font-semibold text-[#173C86] font-poppins text-center">Cambiar Contraseña</h5>
                            {/* Display login error if any */}
                            {loginError && <p className="text-sm text-red-600">{loginError}</p>}
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
                                    } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                                    placeholder="name@company.com"
                                />
                                {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Nueva Contraseña
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
                                    } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                                />
                                {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Confirmar Contraseña
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className={`bg-gray-50 border ${
                                        errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                    } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                                />
                                {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Cambiar Contraseña
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ChangePassword
