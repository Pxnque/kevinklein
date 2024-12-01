import React from 'react';
import Image from 'next/image';
import default_img from '@/app/public/img/red_glasses.png';

// Define el tipo de un producto
interface Producto {
  id: string;
  nombre: string;
  url: string;
  precio: number;
  descuento: number;
}

// Props del componente
interface ProductCardDiscountProps {
  productos: Producto[]; // Recibe los productos seleccionados
}

const ProductCardDiscount: React.FC<ProductCardDiscountProps> = ({ productos }) => {
  if (productos.length === 0) {
    return <p>No hay productos disponibles.</p>;
  }

  return (
    <div className="flex flex-col space-y-6">
      {productos.map((producto) => (
        <div key={producto.id} className="flex border rounded-lg overflow-hidden shadow-lg bg-white max-w-sm">
          {/* Imagen del producto */}
          <div className="w-1/3 relative">
            <Image
              src={producto.url || default_img} // Usa una imagen por defecto si no tiene imagen
              alt={producto.nombre}
              fill={true}
              sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={100}
              className="rounded-l-lg"
            />
          </div>

          {/* Información del producto */}
          <div className="w-2/3 p-4 flex flex-col justify-center">
            {/* Nombre del producto */}
            <h2 className="text-lg font-semibold mb-2">{producto.nombre}</h2>
            {/* Precio con descuento */}
            <div className="flex items-center space-x-2">
              <p className="text-xl font-bold text-pink-600">${(producto.precio * (1 - producto.descuento)).toFixed(2)}</p>
              <p className="text-gray-500 line-through">${producto.precio.toFixed(2)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCardDiscount;
