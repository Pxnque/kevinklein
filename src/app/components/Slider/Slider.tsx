"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import PocketBase from "pocketbase";

const pb = new PocketBase("https://kevinklein.pockethost.io");

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [productos, setProductos] = useState<{
    id: string;
    nombre: string;
    precio: number;
    fotos: string[];
  }[]>([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await pb.collection("productos").getFullList(36, {
          sort: "-created", // Trae los 36 más recientes para soportar 3 slides de 12 productos en total.
        });
        const formattedProductos = response.map((producto) => ({
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          fotos: producto.fotos || [],
        }));
        setProductos(formattedProductos);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      }
    };

    fetchProductos();
  }, []);

  const totalSlides = 3; // Limitar a 3 slides manualmente

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide((prevSlide) => prevSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prevSlide) => prevSlide - 1);
    }
  };

  return (
    <div className="bg-white py-10">
      <h2 className="text-center text-2xl font-bold mb-6 text-black">
        Te puede interesar
      </h2>
      <div className="relative flex items-center">
        {/* Botón anterior */}
        <button
          onClick={prevSlide}
          className={`absolute left-2 z-10 bg-white text-black rounded-full p-2 shadow-lg ${
            currentSlide === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentSlide === 0}
        >
          ←
        </button>

        {/* Contenedor de productos */}
        <div className="w-full md:w-[80%] mx-auto overflow-hidden">
          <div
            className="flex transition-transform duration-300"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {productos.slice(0, 12).map((producto) => (
              <div
                key={producto.id}
                className="w-1/2 sm:w-1/3 md:w-1/4 flex-shrink-0 p-2 hover:scale-105 transition-transform duration-300"
              >
                <a href={`/productos/${producto.id}`}>
                  <div className="bg-white p-4 rounded-lg shadow-md text-center hover:bg-gray-200 transition-colors">
                    <Image
                      src={
                        producto.fotos.length > 0
                          ? `${pb.baseUrl}/api/files/productos/${producto.id}/${producto.fotos[0]}`
                          : "/img/generic_img.png" // Imagen genérica si no hay fotos
                      }
                      alt={producto.nombre}
                      width={150}
                      height={150}
                      className="mx-auto object-cover h-[150px] w-[150px]"
                    />
                    <p className="mt-2 text-black">{producto.nombre}</p>
                    <p className="text-black">${producto.precio} MXN</p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Botón siguiente */}
        <button
          onClick={nextSlide}
          className={`absolute right-2 z-10 bg-white text-black rounded-full p-2 shadow-lg ${
            currentSlide === totalSlides - 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentSlide === totalSlides - 1}
        >
          →
        </button>
      </div>
    </div>
  );
}
