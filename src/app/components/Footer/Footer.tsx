import React from 'react'
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaPinterestP } from "react-icons/fa";




const Footer = () => {
  return (
    <>
    
    <div className="bg-black text-white py-10 font-montserrat">
  <div className="max-w-7xl mx-auto flex flex-wrap justify-around">
    

    <div className="w-full sm:w-1/2 md:w-1/4 mb-8 border-r border-gray-700 pl-2">
      <h3 className="text-xl font-bold mb-4 border-b border-gray-700">Sobre Kelvin Klein</h3>
      <p className="mb-4">One of the most popular on the web is shopping.</p>
      <p className="mb-2 flex items-center">
        <FaMapMarkerAlt/><span className="ml-2">C. Magnolia 24, Morelia, Mexico</span>
      </p>
      <p className="mb-2 flex items-center">
        <FaPhoneAlt/><span className="ml-2">+52 443 103 9983</span>
      </p>
      <p className="mb-4 flex items-center">
        <MdMailOutline/> <a href="mailto:hello@kelvinklein.com" className="ml-2 hover:text-gray-400">hello@kelvinklein.com</a>
      </p>
      <div className="flex space-x-4">
        <a href="#" className="hover:text-gray-400">
            <FaFacebook/>
        </a>
        <a href="#" className="hover:text-gray-400">
          <FaXTwitter/>
        </a>
        <a href="#" className="hover:text-gray-400">
          <FaInstagram/>
        </a>
        <a href="#" className="hover:text-gray-400">
          <FaLinkedinIn/>
        </a>
        <a href="#" className="hover:text-gray-400">
          <FaPinterestP/>
        </a>
      </div>
    </div>

    
    <div className="w-full sm:w-1/2 md:w-1/4 mb-8 border-r border-gray-700">
      <h3 className="text-xl font-bold mb-4 border-b border-gray-700">Links</h3>
      <ul className="space-y-2 pl-6">
        <li><a href="#" className="hover:text-gray-400 font-bold">Nosotros</a></li>
        <li><a href="#" className="hover:text-gray-400 font-bold">¡Compra Ahora!</a></li>
        <li><a href="#" className="hover:text-gray-400 font-bold">FAQ's</a></li>
        <li><a href="#" className="hover:text-gray-400 font-bold">Contáctanos</a></li>
        <li><a href="#" className="hover:text-gray-400 font-bold">Servicio al Cliente</a></li>
      </ul>
    </div>

    
    <div className="w-full sm:w-1/2 md:w-1/4 mb-8 border-r border-gray-700 ">
      <h3 className="text-xl font-bold mb-4 border-b border-gray-700">Servicio Al Cliente</h3>
      <ul className="space-y-2 pl-6">
        <li><a href="#" className="hover:text-gray-400 font-bold">Mi Cuenta</a></li>
        <li><a href="#" className="hover:text-gray-400 font-bold">Carrito</a></li>
        <li><a href="#" className="hover:text-gray-400 font-bold">FAQ's</a></li>
        <li><a href="#" className="hover:text-gray-400 font-bold">Seguimiento de Orden</a></li>
        <li><a href="#" className="hover:text-gray-400 font-bold">Ayuda & Soporte</a></li>
      </ul>
    </div>


    <div className="w-full sm:w-1/2 md:w-1/4">
      <h3 className="text-xl font-bold mb-4 border-b border-gray-700">Newsletter</h3>
      <p className="mb-4 pl-6">Para obtener las últimas noticias y las últimas actualizaciones.</p>
      <p className='font-bold py-2 pl-6'>Tu Email: </p>
      <form className="flex flex-col space-y-2 px-3">
        <input type="email" placeholder="Ingresa tu Email" 
               className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        <button type="submit" 
                className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
          Suscríbete
        </button>
      </form>
    </div>

  </div>
</div>
    
    </>
  )
}

export default Footer