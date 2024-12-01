"use client";
import React, { useEffect, useState } from 'react';

const CheckoutSummary = () => {
  const [items, setItems] = useState<any[]>([]); // Estado para almacenar los productos del carrito
  const [subtotal, setSubtotal] = useState<number>(0);
  const [discounts, setDiscounts] = useState<number>(0);
  const shipping = "Calcular";

  // Cargar datos del carrito y calcular subtotal y descuentos
  useEffect(() => {
    const cartItems = localStorage.getItem('cart');
    if (cartItems) {
      const parsedItems = JSON.parse(cartItems);
      setItems(parsedItems);

      // Calcular subtotal y descuentos
      const calculatedSubtotal = parsedItems.reduce(
        (sum: number, item: any) => sum + item.quantity * item.originalPrice,
        0
      );
      const calculatedDiscounts = parsedItems.reduce(
        (sum: number, item: any) => sum + item.quantity * (item.originalPrice - item.discountedPrice),
        0
      );

      setSubtotal(calculatedSubtotal);
      setDiscounts(calculatedDiscounts);
    }
  }, []);

  const total = subtotal - discounts; // Calcular el total

  if (items.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <p className="text-gray-500">No hay productos en el carrito.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-12 border border-gray-400 max-w-md">
      <div className="mb-2">
        <span className="font-medium">Subtotal</span>
        <span className="float-right">${subtotal.toFixed(2)}</span>
      </div>
      <div className="border-t border-gray-300 my-2"></div>
      <div className="mb-2">
        <span className="font-medium">Descuentos</span>
        <span className="float-right">-${discounts.toFixed(2)}</span>
      </div>
      <div className="border-t border-gray-300 my-2"></div>
      <div className="mb-2">
        <span className="font-medium">Envío</span>
        <span className="float-right">{shipping}</span>
      </div>
      <div className="border-t border-gray-300 my-2"></div>
      <div className="mb-4">
        <span className="font-semibold text-xl">Total</span>
        <span className="float-right text-lg font-bold">${total.toFixed(2)}</span>
      </div>
      <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600">
        Finalizar compra
      </button>
      <button className="w-full mt-2 bg-gray-200 text-gray-700 font-semibold py-2 rounded-md hover:bg-gray-300">
        <a href="/Homepage">Elegir más productos</a>
      </button>
    </div>
  );
};

export default CheckoutSummary;
