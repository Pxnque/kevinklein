"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import zapatosImage from "../Img/Zapatos.png"; 
import productoImagen from "../Img/Persona.png"; 
import { FaTruckFast } from "react-icons/fa6";
import { BiSolidDiscount } from "react-icons/bi";
import { MdSupportAgent } from "react-icons/md";
import { RiSecurePaymentLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const productos = [
    { nombre: "Camisa Casual", precio: "250 MXN", rating: "★★★★★", image: productoImagen },
    { nombre: "Sudadera Deportiva", precio: "300 MXN", rating: "★★★★☆", image: productoImagen },
    { nombre: "Pantalones Jeans", precio: "400 MXN", rating: "★★★☆☆", image: productoImagen },
    { nombre: "Chamarra de Invierno", precio: "600 MXN", rating: "★★★★★", image: productoImagen },
    { nombre: "Playera Básica", precio: "150 MXN", rating: "★★★★☆", image: productoImagen },
    { nombre: "Shorts de Verano", precio: "180 MXN", rating: "★★★☆☆", image: productoImagen },
  ];

  const totalSlides = Math.ceil(productos.length / 4);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? totalSlides - 1 : prevSlide - 1
    );
  };

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

      {/* Carrusel de productos más compacto */}
      <div className="py-10">
        <h2 className="text-center text-2xl font-bold mb-6">NOVEDADES</h2>
        <div className="relative flex items-center">
          <button
            onClick={prevSlide}
            className="absolute left-2 z-10 bg-white text-black rounded-full p-2 shadow-lg"
          >
            ←
          </button>

          <div className="w-[80%] mx-auto overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {productos.map((producto, index) => (
                <div
                  key={index}
                  className="w-1/4 flex-shrink-0 p-2 hover:scale-105 transition-transform duration-300"
                >
                  <div className="bg-white p-4 rounded-lg shadow-md text-center hover:bg-black transition-colors">
                    <Image
                      src={producto.image}
                      alt={producto.nombre}
                      className="mx-auto"
                    />
                    <p className="mt-2 text-black hover:text-white">{producto.nombre}</p>
                    <p className="text-black hover:text-white">{producto.precio}</p>
                    <div className="text-black hover:text-white">{producto.rating}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={nextSlide}
            className="absolute right-2 z-10 bg-white text-black rounded-full p-2 shadow-lg"
          >
            →
          </button>
        </div>
      </div>

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
