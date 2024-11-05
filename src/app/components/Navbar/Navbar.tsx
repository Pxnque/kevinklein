import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ImagenLogin from '@/app/public/img/logo.png';
import { IoPersonOutline, IoSearchSharp, IoCartOutline } from "react-icons/io5";
//navbar gradient
const Navbar = () => {
  return (
    <> 
    
      <header className=" bg-black">
        <nav className="flex justify-between items-center w-[92%] mx-auto">
          
          <div>
            <a href="/">
            <Image src={ImagenLogin} alt='logo' className='w-16 cursor-pointer'/>
            </a>
          </div>

          <div className="nav-links duration-500 md:static absolute md:min-h-fit min-h-[60vh] left-0 top-[-100%] md:w-auto w-full flex items-center px-5">
            <ul className="text-white flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8 font-montserrat">
              <li>
                <Link href="/" className="hover:text-gray-200">INICIO</Link>
              </li>
              <li>
                <Link href="/Homepage" className="hover:text-gray-200">HOMBRE</Link>
              </li>
              <li>
                <Link href="/Homepage" className="hover:text-gray-200">MUJER</Link>
              </li>
              <li>
                <Link href="/preguntar-frecuentes" className="hover:text-gray-200">NOSOTROS</Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-6">
            <IoSearchSharp size={20} className='text-white'/>
            <IoPersonOutline size={20} className='text-white'/>
            <a href="/ShoppingCart"><IoCartOutline size={20} className='text-white'/></a>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
