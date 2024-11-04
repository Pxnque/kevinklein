"use client"; 
import Image from "next/image";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import zapatosImage from "../Img/Zapatos.png";
import Slider from "../components/Slider/Slider"; // Importa el componente Slider
import { FaTruckFast } from "react-icons/fa6";
import { BiSolidDiscount } from "react-icons/bi";
import { MdSupportAgent } from "react-icons/md";
import { RiSecurePaymentLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <Navbar />
      
      {/* Imagen de zapatos con mayor protagonismo */}
      <div className="relative h-[60vh] bg-black">
        <Image
          src={zapatosImage}
          alt="Zapatos"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-bold mb-4">Nuevas Colecciones de Zapatos</h1>
          <p className="text-2xl mb-6">Calidad y estilo a tu alcance</p>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
            Conoce Más
          </button>
        </div>
      </div>

      {/* Componente del slider */}
      <Slider />

      {/* Sección de servicios */}
      <div className="max-w-7xl mx-auto py-10 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center justify-center bg-gray-300 text-black hover:text-white hover:bg-blue-700 transform transition duration-500 hover:scale-105 p-6 rounded-md">
          <div className="text-center">
            <FaTruckFast className="w-12 h-12 mx-auto mb-2" />
            <p className="font-semibold">Envíos Gratis</p>
          </div>
        </div>
        <div className="flex items-center justify-center bg-gray-300 text-black hover:text-white hover:bg-blue-700 transform transition duration-500 hover:scale-105 p-6 rounded-md">
          <div className="text-center">
            <BiSolidDiscount className="w-12 h-12 mx-auto mb-2" />
            <p className="font-semibold">Cupones de Descuento</p>
          </div>
        </div>
        <div className="flex items-center justify-center bg-gray-300 text-black hover:text-white hover:bg-blue-700 transform transition duration-500 hover:scale-105 p-6 rounded-md">
          <div className="text-center">
            <MdSupportAgent className="w-12 h-12 mx-auto mb-2" />
            <p className="font-semibold">Soporte 24/7</p>
          </div>
        </div>
        <div className="flex items-center justify-center bg-gray-300 text-black hover:text-white hover:bg-blue-700 transform transition duration-500 hover:scale-105 p-6 rounded-md">
          <div className="text-center">
            <RiSecurePaymentLine className="w-12 h-12 mx-auto mb-2" />
            <p className="font-semibold">Pagos Seguros</p>
          </div>
        </div>
        <div className="flex items-center col-span-4 justify-center py-3 tracking-[5px] font-[275]">
          <FaInstagram className="mx-1" />
          <p>
            SÍGUENOS EN{" "}
            <a
              href="https://www.instagram.com/calvinklein/"
              className="font-bold"
            >
              @KEVKLEIN
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}
