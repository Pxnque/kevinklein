"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const CartItems = () => {
  const [items, setItems] = useState<any[]>([]); // State for cart items

  // Load cart data from localStorage
  useEffect(() => {
    const cartItems = localStorage.getItem("cart");
    if (cartItems) {
      setItems(JSON.parse(cartItems));
    }
  }, []);

  // Save updated cart in localStorage
  const updateCart = (updatedItems: any[]) => {
    setItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  const incrementQuantity = (index: number) => {
    const updatedItems = [...items];
    updatedItems[index].quantity += 1;
    updateCart(updatedItems);
  };

  const decrementQuantity = (index: number) => {
    const updatedItems = [...items];
    if (updatedItems[index].quantity > 1) {
      updatedItems[index].quantity -= 1;
      updateCart(updatedItems);
    } else {
      removeItem(index);
    }
  };

  const removeItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    updateCart(updatedItems);
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Carrito de compras</h1>
        <p className="text-gray-500">Tu carrito está vacío.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Carrito de compras</h1>
      <hr className="w-full border border-gray-400 my-2" />

      {/* Table for larger screens */}
      <div className="hidden md:block">
        <table className="w-full text-left table-auto border-collapse">
          <thead>
            <tr className="font-semibold border-b border-gray-300">
              <th className="p-2">Producto</th>
              <th className="p-2">Envío</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Cantidad</th>
              <th className="p-2">Total</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="p-2">
                  <Image
                    src={item.img}
                    alt={item.product}
                    width={50}
                    height={50}
                    className="inline-block mr-2"
                  />
                  {item.product}
                </td>
                <td className="p-2">{item.shipping}</td>
                <td className="p-2">
                  <p className="line-through">
                    De ${(item.originalPrice * 1).toFixed(2)}
                  </p>
                  Por ${(item.discountedPrice * 1).toFixed(2)}
                </td>
                <td className="p-2">
                  <div className="flex items-center">
                    <button
                      className="px-2 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
                      onClick={() => decrementQuantity(index)}
                    >
                      -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      className="px-2 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
                      onClick={() => incrementQuantity(index)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="p-2">
                  ${item.quantity * item.discountedPrice}
                </td>
                <td className="p-2">
                  <button
                    className="px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded"
                    onClick={() => removeItem(index)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for smaller screens */}
      <div className="md:hidden space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-4 shadow-sm"
          >
            <div className="flex items-center space-x-4 mb-4">
              <Image
                src={item.img}
                alt={item.product}
                width={50}
                height={50}
                className="flex-shrink-0"
              />
              <div>
                <h2 className="font-bold">{item.product}</h2>
                <p className="text-sm text-gray-500">{item.shipping}</p>
              </div>
            </div>
            <p className="text-sm">
              <span className="line-through text-gray-500">
                De ${(item.originalPrice * 1).toFixed(2)}
              </span>{" "}
              <span className="font-bold">
                Por ${(item.discountedPrice * 1).toFixed(2)}
              </span>
            </p>
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center">
                <button
                  className="px-2 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
                  onClick={() => decrementQuantity(index)}
                >
                  -
                </button>
                <span className="px-4">{item.quantity}</span>
                <button
                  className="px-2 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
                  onClick={() => incrementQuantity(index)}
                >
                  +
                </button>
              </div>
              <p className="font-bold">
                Total: ${(item.quantity * item.discountedPrice).toFixed(2)}
              </p>
              <button
                className="px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded"
                onClick={() => removeItem(index)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartItems;
