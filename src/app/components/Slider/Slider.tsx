"use client";
import { useState } from "react";
import Image from "next/image";
import productoImagen from "../../Img/Persona.png";

export default function Slider() {
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
    <div className="bg-white py-10"> {/* Fondo blanco aplicado al componente */}
      <h2 className="text-center text-2xl font-bold mb-6 text-black">NOVEDADES</h2>
      <div className="relative flex items-center">
        <button
          onClick={prevSlide}
          className="absolute left-2 z-10 bg-white text-black rounded-full p-2 shadow-lg"
        >
          ←
        </button>

        <div className="w-[80%] mx-auto overflow-hidden">
          <div
            className="flex transition-transform duration-300"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {productos.map((producto, index) => (
              <div
                key={index}
                className="w-1/4 flex-shrink-0 p-2 hover:scale-105 transition-transform duration-300"
              >
                <div className="bg-white p-4 rounded-lg shadow-md text-center hover:bg-gray-200 transition-colors">
                  <Image
                    src={producto.image}
                    alt={producto.nombre}
                    className="mx-auto"
                  />
                  <p className="mt-2 text-black">{producto.nombre}</p>
                  <p className="text-black ">{producto.precio}</p>
                  <div className="text-black ">{producto.rating}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={nextSlide}
          className="absolute right-2 z-10 bg-white  text-black  rounded-full p-2 shadow-lg "
        >
          →
        </button>
      </div>
    </div>
  );
}
