import React from 'react';
import Image from 'next/image';
import { FaShoppingCart, FaHeart, FaEye, FaExchangeAlt } from 'react-icons/fa';
import imgCard from '@/app/public/img/glasses.png';

const ProductCard = () => {
  return (
    <div className="flex border rounded-lg overflow-hidden shadow-lg bg-white max-w-xl">
      {/* Imagen del producto */}
      <div className="w-1/2 relative">
        <Image 
          src={imgCard}
          alt="Product Image"
          layout="fill"
          objectFit="cover"
          className="rounded-l-lg"
        />
      </div>

      {/* Información del producto */}
      <div className="w-1/2 p-4 flex flex-col justify-between">
        {/* Nombre y calificación */}
        <div>
          <h2 className="text-black text-xl font-medium mb-2">Nombre de Prenda</h2>
          <div className="flex items-center space-x-1 text-black mb-4">
            {Array(5).fill(null).map((_, i) => (
              <svg key={i} className="w-4 h-4 fill-current text-black" viewBox="0 0 24 24">
                <path d="M12 .587l3.668 7.568L24 9.423l-6 5.847 1.417 8.253L12 18.897l-7.417 4.626L6 15.27 0 9.423l8.332-1.268z" />
              </svg>
            ))}
          </div>
          {/* Precio */}
          <p className="text-2xl font-bold text-black mb-4">$200 MXN</p>
          <hr className="border-black mb-2" />
          <hr className="mt-8 border-black mb-2" />
        </div>

        {/* Botones de acción */}
        <div className="flex justify-between mt-4">
          <button className="p-2 text-gray-700 hover:text-white hover:bg-gray-200 rounded transition duration-300 border border-black">
            <FaShoppingCart href='/ShoppingCart'/>
          </button>
          <button className="p-2 text-red-600 hover:text-white hover:bg-red-600 rounded transition duration-300 border border-black">
            <FaHeart />
          </button>
          <button className="p-2 text-gray-700 hover:text-white hover:bg-gray-200 rounded transition duration-300 border border-black">
            <FaEye />
          </button>
          <button className="p-2 text-gray-700 hover:text-white hover:bg-gray-200 rounded transition duration-300 border border-black">
            <FaExchangeAlt />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
