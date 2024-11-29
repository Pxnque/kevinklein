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
  descuento: number;
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
          descuento: producto.descuento,
        }));

        setProductos(productosList); // Actualizar el estado de productos

        // Obtener reseñas para cada producto
        const reviewsData = await Promise.all(
          productosList.map(async (producto) => {
            // Obtener las reseñas para cada producto
            const reviewData = await pb.collection('product_reviews').getFullList(200, {
              filter: `product_id = "${producto.id}"`, requestKey: null
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
      <div className="flex items-center space-x-1 text-black mb-4">
        {/* Mapeamos las estrellas llenas */}
        {Array(fullStars).fill(true).map((_, i) => (
          <svg
            key={`filledStar-${i}`}  // Asignar un key único por cada estrella llena
            className="w-4 h-4 fill-current text-yellow-500"
            viewBox="0 0 24 24"
          >
            <path d="M12 .587l3.668 7.568L24 9.423l-6 5.847 1.417 8.253L12 18.897l-7.417 4.626L6 15.27 0 9.423l8.332-1.268z" />
          </svg>
        ))}

        {/* Mapeamos las estrellas medias */}
        {Array(halfStar).fill(true).map((_, i) => (
          <svg
            key={`halfStar-${i}`}  // Asignar un key único para las estrellas medias
            className="w-4 h-4 fill-current text-yellow-500"
            viewBox="0 0 24 24"
          >
            <path d="M12 .587l3.668 7.568L24 9.423l-6 5.847 1.417 8.253L12 18.897l-7.417 4.626L6 15.27 0 9.423l8.332-1.268z" />
          </svg>
        ))}

        {/* Mapeamos las estrellas vacías */}
        {Array(emptyStars).fill(false).map((_, i) => (
          <svg
            key={`emptyStar-${i}`}  // Asignar un key único por cada estrella vacía
            className="w-4 h-4 fill-current text-gray-300"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27l6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73-1.64 7.03z" />
          </svg>
        ))}
      </div>
    );
  };

  if (productos.length === 0) {
    return <p>Cargando productos...</p>; // Muestra algo mientras los datos se cargan
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
      {productos.map((producto) => (
        <div key={producto.id} className="flex border rounded-lg overflow-hidden shadow-lg bg-white">
          {/* Imagen del producto */}
          <div className="relative w-1/2">
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
          <div className="w-1/2 p-4 flex flex-col justify-between">
            {/* Nombre y calificación */}
            <div>
              <h2 className="text-black text-xl font-medium my-2">{producto.nombre}</h2>
              <div className="flex items-center space-x-1 text-black my-4">
                {renderStars(ratings[producto.id] || 0)} {/* Usa el rating de ese producto */}
              </div>
              {/* Precio */}
              <p className="text-2xl font-bold text-black my-4">${(producto.precio * (1 - producto.descuento)).toFixed(2)} MXN</p>
              <hr className="border-black mb-20" />
              <hr className="border-black mb-2" />
            </div>

            {/* Botones de acción */}
            <div className="flex justify-start my-8">
              <button className="mx-2 p-2 text-gray-700 hover:text-white hover:bg-gray-200 rounded transition duration-300 border border-black">
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
      ))}
    </div>
  );
};

export default ProductCard;
