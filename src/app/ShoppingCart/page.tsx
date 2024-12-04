"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import CartItems from "../components/CartItems/CartItems";
import CheckoutSummary from "../components/CheckoutSummary/CheckoutSummary";
import Slider from "../components/Slider/Slider";
import Chatbot from "../components/Chatbot/Chatbot";

const ShoppingCart: React.FC = () => {
  const [coupon, setCoupon] = useState(""); // State to track input value

  // Function to handle input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCoupon(event.target.value);
  };

  return (
    <>
      <div className="bg-white text-black">
        <div className="bg-black">
          <Navbar />
        </div>

        <main className="min-h-screen flex flex-col items-center justify-center space-y-8">
          <CartItems />
          <div className="container mx-auto p-12 border border-gray-400 2xl:max-2xl: xl:max-w-xl lg:max-w-lg md:max-w-md justify-center content-center text-xl">
            <p>Añadir cupón de descuento</p>
            <div>
              <input
                type="text"
                id="coupon-input"
                value={coupon}
                onChange={handleInputChange}
                className={`${
                  coupon
                    ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
                    : "bg-white border border-gray-400 text-black placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                } text-sm rounded-lg block w-full p-2.5 mt-3`}
                placeholder="Introduce tu cupón aquí"
              />
              {coupon && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span className="font-medium">Upsi dupsi!</span> Este cupón de
                  descuento ya expiró.
                </p>
              )}
            </div>
          </div>
          <CheckoutSummary />
        </main>
        <Slider />
        <Footer />
        <Chatbot />
      </div>
    </>
  );
};

export default ShoppingCart;
