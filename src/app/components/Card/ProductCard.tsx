import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaShoppingCart, FaHeart, FaEye, FaExchangeAlt } from 'react-icons/fa';
import pb from '@/app/lib/pocketbase'; // Asegúrate de importar tu cliente de PocketBase
import default_img from '@/app/public/img/glasses.png';

// Define el tipo de un producto según la estructura de PocketBase
interface Producto {
  id: string;
  nombre: string;
  url: string;  // 'url' es el campo de archivo en PocketBase
  precio: number;
}

interface Review {
  rating: number;
}

const ProductCard = () => {
  const [productos, setProductos] = useState<Producto[]>([]); // Para almacenar los productos
  const [ratings, setRatings] = useState<Record<string, number>>({}); // Almacenamos el rating promedio por producto

  // Obtener datos de todos los productos
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        // Obtener todos los productos desde PocketBase
        const productoData = await pb.collection('productos').getFullList();

        // Convertir los datos obtenidos en el tipo Producto
        const productosList = productoData.map((producto: any) => ({
          id: producto.id,
          nombre: producto.nombre,
          url: producto.fotos && producto.fotos[0] ? pb.files.getURL(producto, producto.fotos[0]) : '',  // Obtén la URL del archivo
          precio: producto.precio,
        }));

        setProductos(productosList); // Actualizar el estado de productos
        console.log(productosList);

        // Obtener reseñas para cada producto
        const reviewsData = await Promise.all(
          productosList.map(async (producto) => {
            // Obtener las reseñas para cada producto
            const reviewData = await pb.collection('product_reviews').getFullList(200, {
              filter: `product_id = "${producto.id}"`,
            });

            // Calcular el rating promedio para este producto
            const avgRating = reviewData.length
              ? reviewData.reduce((sum, review) => sum + review.rating, 0) / reviewData.length
              : 0;

            return { productoId: producto.id, avgRating };
          })
        );

        // Guardamos los ratings por producto
        const ratingsMap: Record<string, number> = {};
        reviewsData.forEach(({ productoId, avgRating }) => {
          ratingsMap[productoId] = avgRating;
        });

        setRatings(ratingsMap); // Actualizamos los ratings
      } catch (error) {
        console.error('Error al obtener los datos de los productos o reseñas:', error);
      }
    };

    fetchProductos();
  }, []);

  // Función para renderizar estrellas según la calificación
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <>
        {Array(fullStars).fill(<svg className="w-4 h-4 fill-current text-yellow-500" viewBox="0 0 24 24">
          <path d="M12 .587l3.668 7.568L24 9.423l-6 5.847 1.417 8.253L12 18.897l-7.417 4.626L6 15.27 0 9.423l8.332-1.268z" />
        </svg>)}
        {Array(halfStar).fill(<svg className="w-4 h-4 fill-current text-yellow-500" viewBox="0 0 24 24">
          <path d="M12 .587l3.668 7.568L24 9.423l-6 5.847 1.417 8.253L12 18.897l-7.417 4.626L6 15.27 0 9.423l8.332-1.268z" />
        </svg>)}
        {Array(emptyStars).fill(<svg className="w-4 h-4 fill-current text-gray-300" viewBox="0 0 24 24">
          <path d="M12 .587l3.668 7.568L24 9.423l-6 5.847 1.417 8.253L12 18.897l-7.417 4.626L6 15.27 0 9.423l8.332-1.268z" />
        </svg>)}
      </>
    );
  };

  if (productos.length === 0) {
    return <p>Cargando productos...</p>; // Muestra algo mientras los datos se cargan
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {productos.map((producto) => (
        <div key={producto.id} className="flex border rounded-lg overflow-hidden shadow-lg bg-white">
          {/* Imagen del producto */}
          <div className="w-1/2 relative">
            <Image
              src={producto.url || default_img} // Usa una imagen por defecto si no tiene imagen
              alt={producto.nombre}
              width={300} // Establece un ancho y alto fijo si es necesario
              height={300}
              objectFit="cover"
              className="rounded-l-lg"
            />
          </div>

          {/* Información del producto */}
          <div className="w-1/2 p-4 flex flex-col justify-between">
            {/* Nombre y calificación */}
            <div>
              <h2 className="text-black text-xl font-medium mb-2">{producto.nombre}</h2>
              <div className="flex items-center space-x-1 text-black mb-4">
                {renderStars(ratings[producto.id] || 0)} {/* Usa el rating de ese producto */}
              </div>
              {/* Precio */}
              <p className="text-2xl font-bold text-black mb-4">${producto.precio} MXN</p>
              <hr className="border-black mb-2" />
              <hr className="mt-8 border-black mb-2" />
            </div>

            {/* Botones de acción */}
            <div className="flex justify-between mt-4">
              <button className="p-2 text-gray-700 hover:text-white hover:bg-gray-200 rounded transition duration-300 border border-black">
                <FaShoppingCart />
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
      ))}
    </div>
  );
};

export default ProductCard;
