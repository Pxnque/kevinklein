import React from 'react';
import Image from 'next/image';
import imgSidebar from '@/app/public/img/red_glasses.png';

const ProductCardDiscount = () => {
  return (
    <div className="flex border rounded-lg overflow-hidden shadow-lg bg-white max-w-sm">
      {/* Imagen del producto */}
      <div className="w-1/3 relative">
        <Image 
          src={imgSidebar}
          alt="Product Image"
          layout="fill"
          objectFit="cover"
          className="rounded-l-lg"
        />
      </div>

      {/* Información del producto */}
      <div className="w-2/3 p-4 flex flex-col justify-center">
        {/* Nombre del producto */}
        <h2 className="text-lg font-semibold mb-2">Lorem ipsum dolor</h2>
        
        {/* Precio con descuento */}
        <div className="flex items-center space-x-2">
          <p className="text-xl font-bold text-red-600">$80.00</p>
          <p className="text-gray-500 line-through">$90.11</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCardDiscount;
