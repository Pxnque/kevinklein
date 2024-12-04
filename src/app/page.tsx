"use client";
import Image from "next/image";
import Navbar from "./components/Navbar/Navbar";
import ImageSlider from "./components/ImageSlider/ImageSlider";
import Footer from "./components/Footer/Footer";
import zapatosImage from "./Img/Zapatos.png";
import Slider from "./components/Slider/Slider";
import { FaTruckFast } from "react-icons/fa6";
import { BiSolidDiscount } from "react-icons/bi";
import { MdSupportAgent } from "react-icons/md";
import { RiSecurePaymentLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import Sidebar from "./components/Sidebar/Sidebar";
import ProductCard from "./components/Card/ProductCard";
import Chatbot from "./components/Chatbot/Chatbot";
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <div className="relative h-[100vh] bg-black">
        <Image
          src={zapatosImage}
          alt="Zapatos"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 sm:px-6 md:px-8">
          <p className="text-2xl mb-2 font-montserrat font-medium">Top fashion para hombre</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 font-montserrat">Lo mejor en moda para hombres</h1>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 font-montserrat">
            <Link href="/Homepage">Conoce Más</Link>
          </button>
        </div>
      </div>

      {/* Image Slider */}
      <ImageSlider />

      {/* Product Slider */}
      <Slider />

      {/* Benefits Section */}
      <div className="max-w-7xl mx-auto py-10 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
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
      </div>

      {/* Instagram Section */}
      <div className="flex items-center justify-center py-3 tracking-[5px] font-[275]">
        <FaInstagram className="mx-1" />
        <p className="text-center">
          Síguenos en{" "}
          <a
            href="https://www.instagram.com/calvinklein/"
            className="font-bold"
            target="_blank"
            rel="noopener noreferrer"
          >
            @KEVKLEIN
          </a>
        </p>
      </div>

      {/* Chatbot */}
      <Chatbot />

      {/* Footer */}
      <Footer />
    </>
  );
}
