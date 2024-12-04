"use client";
import React, { useEffect, useState } from "react";
import PocketBase from "pocketbase";
import { useRouter } from "next/navigation";
import CheckoutPage from "@/app/components/CheckoutPage/CheckoutPage";
import convertToSubcurrency from "@/app/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const CheckoutSummary = () => {
  const pb = new PocketBase("https://kevinklein.pockethost.io");
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false); // State to handle hydration
  const [items, setItems] = useState<any[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [discounts, setDiscounts] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [isCheckoutComplete, setIsCheckoutComplete] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(pb.authStore.isValid);
  const [shippingAddresses, setShippingAddresses] = useState<any[]>([]);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);

  const shipping = "Calcular";

  // Handle client-only rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);
  var itemscarrito = localStorage.getItem("cart");
  // Load cart data and calculate subtotal and discounts
  useEffect(() => {
    if (!isMounted || !isLoggedIn) return;

    const cartItems = localStorage.getItem("cart");
    if (cartItems) {
      const parsedItems = JSON.parse(cartItems);
      setItems(parsedItems);

      const calculatedSubtotal = parsedItems.reduce(
        (sum: number, item: any) => sum + item.quantity * item.originalPrice,
        0
      );
   

      const calculatedDiscounts = parsedItems.reduce(
        (sum: number, item: any) =>
          sum + item.quantity * (item.originalPrice - item.discountedPrice),
        0
      );
      const calculatedQuantity = parsedItems.reduce(
        (sum: number, item: any) =>
          sum + item.quantity,
        0
      );
      setQuantity(calculatedQuantity);
      setSubtotal(calculatedSubtotal);
      setDiscounts(calculatedDiscounts);
    }
  }, [isMounted, isLoggedIn]);
var addressstatic = "";
  // Fetch shipping addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      if (!isMounted || !isLoggedIn) return;
  
      try {
        const records = await pb.collection("shippingaddresses").getFullList({
          filter: `id_user="${pb.authStore.model?.id}"`,
        });
        
        console.log(records); // Logs the fetched addresses
        //console.log(address1.collectionId)
        setShippingAddresses(records); // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching shipping addresses:", error);
      } finally {
        setIsLoadingAddresses(false);
      }
    };
  
    fetchAddresses();
  }, [isMounted, isLoggedIn]);

  const total = subtotal - discounts;
  const handleAddressChange = (id: string) => {
    setSelectedAddressId(id);
  };

  const handleCheckout = async () => {
    if (!isLoggedIn) {
      alert("Para poder comprar necesita estar logeado.");
      router.push("/auth/Login");
      return;
    }
    try {
      const productIds: string[] = itemscarrito 
  ? JSON.parse(itemscarrito).map((item: any) => item.id) 
  : []; // Extract product IDs from items
      const orderDate = new Date().toISOString(); // Get current timestamp
      console.log("id de los productos del carrito"); // Logs the product IDs
      console.log(productIds); // Logs the product IDs
      const records = await pb.collection("shippingaddresses").getFullList({
        filter: `id_user="${pb.authStore.model?.id}"`,
      });
      const address1 = records[0];
        addressstatic = address1.id;


      const data = {
          user_id: pb.authStore.model?.id, // User ID from props
          product_id: productIds, // Product IDs from cart items
          shipping_id: addressstatic, // Shipping address ID from props
          //order_status: "En camino", // Fixed status
          price: Number(total.toFixed(2)), // Total price from props
          quantity: Number(quantity)
          //payment_status: [], // Payment status can be null as stated
          //order_date: orderDate, // Current date in ISO format
      };
      console.log("data del pedido"); // Logs the order data
      console.log(data); // Logs the order data
      try {
        const record = await pb.collection('sales').create(data);
        console.log("Order created successfully:", record);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error creating order:", error.message);
        } else {
          console.error("Error creating order:", error);
        }
      }

      // Optionally clear the cart
      

     
  } catch (createError) {
      console.error("Error creating order:", createError);
  }

    setIsTransitioning(true);

    // Simulate checkout process with a timeout
    setTimeout(() => {
      setIsTransitioning(false);
      setIsCheckoutComplete(true);
    }, 500);
  };

  if (!isMounted) {
    // Prevent rendering during SSR
    return null;
  }

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto p-12 border border-gray-400 max-w-md text-center">
        <h2 className="text-xl font-bold mb-4">
          Para continuar con la compra es necesario que inicies sesión.
        </h2>
        <button
          onClick={() => router.push("/auth/Login")}
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600"
        >
          Iniciar sesión
        </button>
        <p className="text-sm font-medium text-center text-gray-500 dark:text-gray-300 pt-3">
          ¿No tienes una cuenta?
          <a
            href="/auth/Register"
            className="text-blue-700 hover:underline dark:text-blue-500"
          >
            Registrate
          </a>
        </p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <p className="text-gray-500">No hay productos en el carrito.</p>
      </div>
    );
  }

  return (
    <div
      className={`container mx-auto p-12 border border-gray-400 w-max transition-transform duration-500 ${
        isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
      }`}
    >
      {!isCheckoutComplete ? (
        <div>
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
            <span className="float-right text-lg font-bold">
              ${total.toFixed(2)}
            </span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600"
          >
            Finalizar compra
          </button>
          <button className="w-full mt-2 bg-gray-200 text-gray-700 font-semibold py-2 rounded-md hover:bg-gray-300">
            <a href="/Homepage">Elegir más productos</a>
          </button>
        </div>
      ) : (
        <div className="text-center flex lg:flex-row flex-col w-full lg:w-full" id="shipping">
          <div>
            <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Direcciones de envío:</h3>
              {isLoadingAddresses ? (
                <p>Cargando direcciones...</p>
              ) : shippingAddresses.length > 0 ? (
                <div className="space-y-4">
                  {shippingAddresses.map((address, index) => (
                    <div
                      key={address.id || index} // Use a unique key (fallback to index if id is missing)
                      className="flex items-start p-4 border border-gray-300 rounded-md shadow-sm hover:shadow-lg transition-shadow"
                    >
                      <input
                        type="radio"
                        name="selectedAddress"
                        id={`address-${index}`}
                        onChange={() => handleAddressChange(address.id)}
                        className="mt-1 mr-3"
                      />
                      <label htmlFor={`address-${index}`} className="flex-grow text-left">
                        <p className="font-medium text-lg">{address.nombre_direccion || "Sin nombre"}</p>
                        <p className="text-gray-500">
                          {address.direccion || "Sin dirección"}, {address.ciudad || "Sin ciudad"}, {address.estado || "Sin estado"}, {address.pais || "Sin país"}, {address.codigo_postal || "Sin código postal"}
                        </p>

                      </label>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No se encontraron direcciones de envío.</p>
              )}
            </div>
          </div>
          <div className="w-max lg:mt-0 sm:mt-8">
            <div className="mb-4 px-12 w-max">
              <span className=" float-start font-semibold text-xl">Total</span>
              <span className="float-right text-lg font-bold">
                ${total.toFixed(2)}
              </span>
              <Elements
                stripe={stripePromise}
                options={{
                  mode: "payment",
                  amount: convertToSubcurrency(Number(total.toFixed(2))),
                  currency: "mxn",
                }}
              >
                <CheckoutPage  amount={Number(total.toFixed(2))}/>
              </Elements>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutSummary;