import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ImagenLogin from '@/app/public/img/logo.png';
const Navbar = () => {
  return (
    <>
    
    <header className="navbar-gradient">
        <nav className="flex justify-between items-center w-[92%]  mx-auto">
            <div>
                <Image src={ImagenLogin} alt='logo' className='w-16 cursor-pointer'/>
            </div>
            <div
                className="nav-links duration-500 md:static absolute md:min-h-fit min-h-[60vh] left-0 top-[-100%] md:w-auto  w-full flex items-center px-5">
                <ul className="text-white flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
                    <li>
                        <a className="hover:text-gray-500" href="#">Agregar</a>
                    </li>
                    <li>
                        <a className="hover:text-gray-500" href="#">Ver</a>
                    </li>
                    <li>
                        <a className="hover:text-gray-500" href="#">Actualizar</a>
                    </li>
                    <li>
                        <a className="hover:text-gray-500" href="#">Borrar</a>
                    </li>
                    
                </ul>
            </div>
            <div className="flex items-center gap-6">
                <button className=" text-white px-5 py-2 rounded-full hover:bg-[#87acec]">Sign in</button>
               
            </div>
            </nav>
        </header>
    </>
  )
}

export default Navbar