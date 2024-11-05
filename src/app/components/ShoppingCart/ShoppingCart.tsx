// components/ShoppingCart.js
import React from 'react';
import Image from 'next/image';
import imgCart from '@/app/public/img/glasses.png';
import imgCart2 from '@/app/public/img/red_glasses.png';

const ShoppingCart = () => {
    const items = [
        {
            product: 'Sudadera Kevin Klein. Gris. Talla:G',
            img: imgCart,
            shipping: 'a calcular',
            originalPrice: 1299.00,
            discountedPrice: 1069.10,
            quantity: 1,
            total: 1069.10
        },
        {
            product: 'Sudadera Kevin Klein. Gris. Talla:G',
            img: imgCart2,
            shipping: 'a calcular',
            originalPrice: 1200.00,
            discountedPrice: 1000.00,
            quantity: 1,
            total: 1000.00
        }
    ];

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Carrito de compras</h1>
            <hr className="w-full border border-gray-400 my-2" />
            <table className="w-full text-left table-auto">
                <thead>
                    <tr className='font-semibold'>
                        <th>Producto</th>
                        <th>Envío</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index} className='mt-4 border-b-2 border-black'>
                            <td className="p-2"> <Image src={item.img} alt={item.product} width={50} height={50} className="inline-block mr-2" />
                                {item.product} 
                            </td>
                            <td>{item.shipping}</td>
                            <td>
                                <p className='line-through'>De ${item.originalPrice.toFixed(2)}</p> Por ${item.discountedPrice.toFixed(2)}
                            </td>
                            <td>{item.quantity}</td>
                            <td>${item.total.toFixed(2)}</td>
                            <br />
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ShoppingCart;
