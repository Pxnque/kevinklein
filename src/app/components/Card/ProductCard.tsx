import React from 'react';
import Image from 'next/image'; // Importa el componente Image de Next.js
import img1 from './model.png';

const ProductCard = () => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <Image className="w-full" src={img1} alt="Product Image" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Nombre de Prenda</div>
        <div className="flex items-center space-x-1">
          {Array(5).fill('hola').map((_, i) => (
            <svg key={i} className="w-4 h-4 fill-current text-yellow-500" viewBox="0 0 24 24">
              <path d="M12 .587l3.668 7.568L24 9.423l-6 5.847 1.417 8.253L12 18.897l-7.417 4.626L6 15.27 0 9.423l8.332-1.268z" />
            </svg>
          ))}
        </div>
        <p className="text-gray-700 text-base">$200 MXN</p>
      </div>
      <div className="px-6 pt-4 pb-2 flex justify-between">
        <button className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          <svg className="w-4 h-4 inline-block" viewBox="0 0 24 24">
            <path d="M7 4V2h10v2h5v2H2V4h5zm0 4h10v14H7V8zm2 2v10h6V10H9z" />
          </svg>
        </button>
        <button className="bg-red-200 rounded-full px-3 py-1 text-sm font-semibold text-red-700 mr-2 mb-2">
          <svg className="w-4 h-4 inline-block" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
        <button className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          <svg className="w-4 h-4 inline-block" viewBox="0 0 24 24">
            <path d="M12 4.5C7.305 4.5 3.5 8.305 3.5 13S7.305 21.5 12 21.5 20.5 17.695 20.5 13 16.695 4.5 12 4.5zm0 15c-3.038 0-5.5-2.462-5.5-5.5S8.962 8.5 12 8.5s5.5 2.462 5.5 5.5-2.462 5.5-5.5 5.5z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
