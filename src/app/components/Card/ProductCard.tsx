import React from 'react';
import Image from 'next/image';
import { FaShoppingCart, FaHeart, FaEye, FaExchangeAlt } from 'react-icons/fa';
import default_img from '@/app/public/img/glasses.png';
import { useRouter } from 'next/navigation';

// Tipo para un producto
interface Producto {
  id: string;
  nombre: string;
  url: string;
  descripcion: string;
  precio: number;
  descuento: number;
}

// Props del componente
interface ProductCardProps {
  productData: Producto; // Datos completos del producto
  rating?: number; // Rating opcional
}

const ProductCard: React.FC<ProductCardProps> = ({ productData, rating = 0 }) => {
  const router = useRouter();
  const { id, nombre, url, descripcion, precio, descuento } = productData;
  console.log(productData);
  const handleAddToCart = () => {
    const existingCart = localStorage.getItem('cart');
    const cartItems = existingCart ? JSON.parse(existingCart) : [];
    const productIndex = cartItems.findIndex((item: any) => item.product === productData.nombre);

    if (productIndex >= 0) {
      // Incrementar cantidad y recalcular total
      cartItems[productIndex].quantity += 1;
    } else {
      // Agregar nuevo producto
      const newItem = {
        product: productData.nombre,
        img: productData.url,
        shipping: 'a calcular',
        originalPrice: productData.precio,
        discountedPrice: productData.precio * (1 - productData.descuento),
        quantity: 1,
      };
      cartItems.push(newItem);
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));
    router.push('/ShoppingCart');
  };


  // Renderizar estrellas según el rating
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <div className="flex items-center space-x-1 text-black mb-4">
        {Array(fullStars).fill(true).map((_, i) => (
          <svg key={`filledStar-${id}-${i}`} className="w-4 h-4 fill-current text-yellow-500" viewBox="0 0 24 24">
            <path d="M12 .587l3.668 7.568L24 9.423l-6 5.847 1.417 8.253L12 18.897l-7.417 4.626L6 15.27 0 9.423l8.332-1.268z" />
          </svg>
        ))}
        {Array(halfStar).fill(true).map((_, i) => (
          <svg key={`halfStar-${id}-${i}`} className="w-4 h-4 fill-current text-yellow-500" viewBox="0 0 24 24">
            <path d="M12 .587l3.668 7.568L24 9.423l-6 5.847 1.417 8.253L12 18.897l-7.417 4.626L6 15.27 0 9.423l8.332-1.268z" />
          </svg>
        ))}
        {Array(emptyStars).fill(false).map((_, i) => (
          <svg key={`emptyStar-${id}-${i}`} className="w-4 h-4 fill-current text-gray-300" viewBox="0 0 24 24">
            <path d="M12 17.27l6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73-1.64 7.03z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="flex border rounded-lg overflow-hidden shadow-lg bg-white">
      <div className="relative w-1/2">
        <Image
          src={url || default_img}
          alt={nombre}
          fill={true}
          sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={100}
          className="rounded-l-lg"
        />
      </div>

      {/* Información del producto */}
      <div className="w-1/2 p-4 flex flex-col justify-between">
        {/* Nombre y calificación */}
        <div>
          <h2 className="text-black text-xl font-medium my-2">{nombre}</h2>
          <div className="flex items-center space-x-1 text-black my-4">
            {renderStars(rating)} {/* Usa el rating de ese producto */}
          </div>
          {/* Precio */}
          <p className="text-2xl font-bold text-black my-4">${(precio * (1 - descuento)).toFixed(2)} MXN</p>
          <hr className="border-black mb-2" />
          <p className='text-gray-700'>{descripcion}</p>
          <hr className="border-black mb-2" />
          <p className='font-mono'>Acciones rapidas</p>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-start my-3">
          <button
            onClick={handleAddToCart}
            className="p-2 text-gray-700 hover:text-white hover:bg-gray-200 rounded transition duration-300 border border-black"
          >
            <FaShoppingCart />
          </button>
          <button className="mx-2 p-2 text-red-600 hover:text-white hover:bg-red-600 rounded transition duration-300 border border-black">
            <FaHeart />
          </button>
          <button className="mx-2 p-2 text-gray-700 hover:text-white hover:bg-gray-200 rounded transition duration-300 border border-black">
            <FaEye />
          </button>
          <button className="mx-2 p-2 text-gray-700 hover:text-white hover:bg-gray-200 rounded transition duration-300 border border-black">
            <FaExchangeAlt />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
