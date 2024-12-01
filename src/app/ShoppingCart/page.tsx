"use client"
import React, { useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import CartItems from '../components/CartItems/CartItems'
import CheckoutSummary from '../components/CheckoutSummary/CheckoutSummary'
import Slider from '../components/Slider/Slider'
import Chatbot from "../components/Chatbot/Chatbot";
const ShoppingCart: React.FC = () => {

    return (
        <>
            <div className='bg-white text-black'>
                <div className='bg-black '>
                    <Navbar />
                </div>



                <main className="min-h-screen flex flex-col items-center justify-center space-y-8">
                    <CartItems />
                    <div className="container mx-auto p-12 border border-gray-400 max-w-md justify-center content-center text-xl">
                        <p> Añadir cupón de descuento </p>
                    </div>
                    <CheckoutSummary />
                </main>
                <Slider />

                <Footer />
                <Chatbot />
            </div>
        </>
    )
}

export default ShoppingCart