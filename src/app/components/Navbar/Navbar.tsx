import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ImagenLogin from '@/app/public/img/logo.png';
import { IoPersonOutline } from "react-icons/io5";
import { IoSearchSharp } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
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
                <ul className="text-white flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8 font-montserrat">
                    <li>
                        <a className="hover:text-gray-200" href="#">INICIO</a>
                    </li>
                    <li>
                        <a className="hover:text-gray-200" href="#">HOMBRE</a>
                    </li>
                    <li>
                        <a className="hover:text-gray-200" href="#">MUJER</a>
                    </li>
                    <li>
                        <a className="hover:text-gray-200" href="#">NOSOTROS</a>
                    </li>
                    
                </ul>
            </div>
            <div className="flex items-center gap-6">
                <IoSearchSharp size={20} className='text-white'/>
                <IoPersonOutline size={20} className='text-white'/>
                <IoCartOutline size={20} className='text-white'/>
               
            </div>
            </nav>
        </header>
    </>
  )
}

export default Navbar