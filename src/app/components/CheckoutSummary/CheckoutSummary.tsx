// components/CheckoutSummary.js
import React from 'react';

const CheckoutSummary = () => {
  const subtotal = 2299.00;
  const discounts = 229.90;
  const shipping = "Calcular";
  const total = subtotal - discounts;

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
      <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600">Finalizar compra</button>
      <button className="w-full mt-2 bg-gray-200 text-gray-700 font-semibold py-2 rounded-md hover:bg-gray-300">Elegir más productos</button>
    </div>
  );
};

export default CheckoutSummary;
