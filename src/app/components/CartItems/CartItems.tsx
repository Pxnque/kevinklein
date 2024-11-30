"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const CartItems = () => {
	const [items, setItems] = useState<any[]>([]); // Estado para los productos del carrito

	// Cargar datos del carrito desde localStorage
	useEffect(() => {
		const cartItems = localStorage.getItem('cart');
		if (cartItems) {
			setItems(JSON.parse(cartItems));
		}
	}, []);

	// Guardar el carrito actualizado en localStorage
	const updateCart = (updatedItems: any[]) => {
		setItems(updatedItems);
		localStorage.setItem('cart', JSON.stringify(updatedItems));
	};

	// Incrementar cantidad
	const incrementQuantity = (index: number) => {
		const updatedItems = [...items];
		updatedItems[index].quantity += 1;
		updateCart(updatedItems);
	};

	// Decrementar cantidad
	const decrementQuantity = (index: number) => {
		const updatedItems = [...items];
		if (updatedItems[index].quantity > 1) {
			updatedItems[index].quantity -= 1;
			updateCart(updatedItems);
		} else {
			// Si la cantidad es 1, elimina el producto
			removeItem(index);
		}
	};

	// Eliminar producto
	const removeItem = (index: number) => {
		const updatedItems = items.filter((_, i) => i !== index);
		updateCart(updatedItems);
	};

	// Verificar si el carrito está vacío
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
			<table className="w-full text-left table-auto">
				<thead>
					<tr className="font-semibold">
						<th>Producto</th>
						<th>Envío</th>
						<th>Precio</th>
						<th>Cantidad</th>
						<th>Total</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{items.map((item, index) => (
						<tr key={index} className="mt-4 border-b-2 border-black">
							<td className="p-2">
								<Image src={item.img} alt={item.product} width={50} height={50} className="inline-block mr-2" />
								{item.product}
							</td>
							<td>{item.shipping}</td>
							<td>
								<p className="line-through">De ${(item.originalPrice*1).toFixed(2)}</p> Por ${(item.discountedPrice*1).toFixed(2)}
							</td>
							<td>
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
							<td>${(item.quantity*item.discountedPrice).toFixed(2)}</td>
							<td>
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
	);
};

export default CartItems;
