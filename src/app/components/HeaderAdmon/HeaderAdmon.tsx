import { Search } from 'lucide-react'
import ImagenLogin from '@/app/public/img/LogoAdmin.png'
import ImagenLetras from '@/app/public/img/Letras.png'
import ImagenPerfil from '@/app/public/img/AdminProfile.jpg'
import Image from 'next/image'
import Link from 'next/link'

export function Header() {
    return (
        <header className="w-full bg-white border-b fixed top-0 z-50">
            <div className="flex items-center justify-between px-6 py-3">
            <Link href="/">
                <div className="flex flex-row items-center gap-2 content-center">
                    {/* Logo de Kevin Klein */}
                    
                        <Image src={ImagenLogin} alt="Kevin Klein Logo" height={48} width={48} className="h-12 w-auto cursor-pointer" />
                        {/* Letras de Kevin Klein */}
                        <Image src={ImagenLetras} alt="KEVIN KLEIN" className="ml-5 h-auto w-auto" />
                   
                </div>
                </Link>
                <div className="flex items-center gap-4 flex-1 max-w-xl mx-auto">
                    <div className="relative flex-1">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Image src={ImagenPerfil} alt="Profile" className="rounded-full" width={40} // Ancho de la imagen
            height={40}  />
                        <span className="text-sm font-medium text-black">Kevin Klein</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
