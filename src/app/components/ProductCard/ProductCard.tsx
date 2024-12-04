import React from 'react';
import { FaShoppingCart, FaHeart, FaSync, FaEye } from 'react-icons/fa';

interface ProductCardProps {
  imageUrl: string;
  name: string;
  price: string;
  rating: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ imageUrl, name, price, rating }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 relative group">
      <img src={imageUrl} alt={name} className="w-full h-64 object-contain mb-4 rounded-md" />
      <h2 className="text-xl font-semibold text-center text-black mb-2">{name}</h2>
      <p className="text-gray-700 text-center mb-2">{price}</p>
      <div className="flex justify-center mb-4">
        {[...Array(rating)].map((_, index) => (
          <span key={index} className="text-black">★</span>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-opacity-0 bg-black group-hover:bg-opacity-70 transition-opacity duration-300">
        <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="text-white text-2xl"><FaShoppingCart /></button>
          <button className="text-white text-2xl"><FaHeart /></button>
          <button className="text-white text-2xl"><FaSync /></button>
          <button className="text-white text-2xl"><FaEye /></button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
