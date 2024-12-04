"use client";
import { useState, useEffect } from "react";
import PocketBase from "pocketbase";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Image from "next/image";

const pb = new PocketBase("https://kevinklein.pockethost.io");

interface Product {
  id: string;
  name: string;
  precio: number;
  fotos: string[];
}

interface ShippingAddress {
  id: string;
  direccion: string;
  ciudad: string;
  estado: string;
  pais: string;
  codigo_postal: string;
}

interface Order {
  order_id: string;
  user_id: string;
  product_ids: string[];
  shipping_id: string;
  order_status: string;
  total_price: number;
  payment_status: string;
  order_date: string;
  shipping_address: ShippingAddress;
  products: Product[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const checkAuth = async () => {
      try {
        const user = pb.authStore.model;
        if (!user) {
          console.error("Usuario no autenticado.");
          setLoading(false);
          return false;
        }
        setUserId(user.id);
        return true;
      } catch (error) {
        if (signal.aborted) return; // Si la solicitud fue cancelada, no hacer nada
        console.error("Error al verificar autenticación:", error);
        setLoading(false);
        return false;
      }
    };

    const fetchOrders = async () => {
      if (!(await checkAuth())) return;

      try {
        // Obtener las órdenes del usuario
        const ordersResponse = await pb.collection("orders").getFullList<Order>(10, {
          filter: `user_id="${userId}"`,
          signal, // Agregar el signal de cancelación
        });

        // Obtener los productos relacionados con las órdenes
        const ordersWithDetails = await Promise.all(
          ordersResponse.map(async (order) => {
            const address = await pb.collection("shippingaddresses").getOne<ShippingAddress>(order.shipping_id, { signal });

            // Obtener los productos relacionados con el pedido
            const products = await Promise.all(
              order.product_ids.map(async (productId) => {
                try {
                  // Obtener el producto desde la base de datos utilizando la relación
                  const product = await pb.collection("productos").getOne<Product>(productId, { signal });
                  return product;
                } catch (error) {
                  console.error(`Producto con ID ${productId} no encontrado:`, error);
                  return null; // Retornar null si el producto no existe
                }
              })
            );

            // Filtrar productos nulos (no encontrados)
            const validProducts = products.filter((product) => product !== null);

            // Calcular el precio total de los productos en la orden
            const totalPrice = validProducts.reduce((acc, product) => acc + (product?.precio || 0), 0);

            return {
              ...order,
              shipping_address: address,
              products: validProducts as Product[],
              total_price: totalPrice,
            };
          })
        );

        setOrders(ordersWithDetails);
        setLoading(false);
      } catch (error) {
        if (signal.aborted) return; // Si la solicitud fue cancelada, no hacer nada
        console.error("Error al cargar órdenes:", error);
        setLoading(false);
      }
    };

    fetchOrders();

    return () => {
      controller.abort(); // Cancelar la solicitud cuando el componente se desmonte
    };
  }, [userId]);

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen py-10 px-6">
        <h1 className="text-3xl font-bold text-center mb-10 text-black">Mis Pedidos</h1>
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <p className="text-center text-black">Cargando tus pedidos...</p>
          ) : orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.order_id} className="bg-white shadow-md rounded-lg p-6 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-black">ID de Orden: {order.order_id}</h2>
                  <p className="text-black">Fecha de la Orden: {order.order_date}</p>
                  <p className="text-black">Estado del Pedido: {order.order_status}</p>
                  <p className="text-black">Estado de Pago: {order.payment_status}</p>
                </div>
                <div className="mt-4">
                  <h2 className="text-xl font-bold text-black">Dirección de Envío</h2>
                  <p className="text-black">{order.shipping_address.direccion}</p>
                  <p className="text-black">{`${order.shipping_address.ciudad}, ${order.shipping_address.estado}`}</p>
                  <p className="text-black">{`${order.shipping_address.pais}, ${order.shipping_address.codigo_postal}`}</p>
                </div>
                <div className="mt-4">
                  <h2 className="text-xl font-bold text-black">Productos</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {order.products.length > 0 ? (
                      order.products.map((product) => (
                        <div key={product.id} className="bg-white border rounded-lg shadow-md p-4">
                          <Image
                            src={
                              product.fotos.length > 0
                                ? `${pb.baseUrl}/api/files/productos/${product.id}/${product.fotos[0]}`
                                : "/img/generic_img.png" // Imagen genérica si no hay fotos
                            }
                            alt={product.name}
                            width={150}
                            height={150}
                            className="object-cover mb-2"
                          />
                          <h3 className="font-semibold text-black">{product.name}</h3>
                          <p className="text-black">${product.precio} MXN</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-black">Producto no disponible o eliminado</p>
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <h2 className="text-xl font-bold text-black">Total: </h2>
                  <p className="text-lg text-black">${order.total_price} MXN</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-black">No tienes pedidos.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
