import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import pb from '@/app/lib/pocketbase'; // Asegúrate de importar tu cliente de PocketBase
import default_img from '@/app/public/img/red_glasses.png';

// Define el tipo de un producto según la estructura de PocketBase
interface Producto {
  id: string;
  nombre: string;
  url: string;  // 'url' es el campo de archivo en PocketBase
  precio: number;
  descuento: number;  // Atributo descuento
}

const ProductCardDiscount = () => {
  const [productos, setProductos] = useState<Producto[]>([]); // Para almacenar los productos

  // Obtener productos de PocketBase
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        // Obtener productos con descuento menor a 1 desde PocketBase
        const productoData = await pb.collection('productos').getFullList(20, {
          filter: 'descuento > 0', requestKey: null // Filtra productos cuyo descuento sea menor a 1
        });

        // Convertir los datos obtenidos en el tipo Producto
        const productosList = productoData.map((producto: any) => ({
          id: producto.id,
          nombre: producto.nombre,
          url: producto.fotos && producto.fotos[0] ? pb.files.getURL(producto, producto.fotos[0]) : '',  // Obtén la URL del archivo
          precio: producto.precio,
          descuento: producto.descuento,
        }));

        setProductos(productosList); // Actualizar el estado de productos
      } catch (error) {
        console.error('Error al obtener los productos con descuento:', error);
      }
    };

    fetchProductos();
  }, []);

  // Seleccionar solo 3 productos aleatorios de los filtrados
  const productosAleatorios = productos.sort(() => 0.5 - Math.random()).slice(0, 3);

  if (productosAleatorios.length === 0) {
    return <p>Cargando productos...</p>; // Muestra algo mientras los datos se cargan
  }

  return (
    <div className="flex flex-col space-y-6">
      {productosAleatorios.map((producto) => (
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
