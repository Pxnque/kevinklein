'use client'
import React,{useEffect,useState} from 'react';
import PocketBase from 'pocketbase';
import {
    useStripe,
    useElements,
    PaymentElement,
} from '@stripe/react-stripe-js';
import convertToSubcurrency from '@/app/lib/convertToSubcurrency';
const CheckoutPage = ({amount}: {amount:number}) => {
    const pb = new PocketBase('https://kevinklein.pockethost.io');
    const stripe = useStripe();
    const elements = useElements();
    const [errorMesaage,setErrorMessage] = useState<string>();
    const [clientSecret,setClientSecret] = useState("");
    const [loading,setLoading] = useState(false);
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

    useEffect(() => {
        fetch('/api/create-payment-intent',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({amount: convertToSubcurrency(amount)}),
        })
        .then((res) => res.json())
        .then((data) => {
            setClientSecret(data.clientSecret);
        });
    },[amount]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setLoading(true);
      
      if (!stripe || !elements) {
          return;
      }
      localStorage.removeItem('cart');
      const { error: submitError } = await elements.submit();
      if (submitError) {
          setErrorMessage(submitError.message);
          setLoading(false);
          return;
      }
      //`http://localhost:3000/payment-success?amount=${amount}`
      const { error } = await stripe.confirmPayment({
          elements,
          clientSecret,
          confirmParams: {
            
              return_url: 'https://www.fragrantica.es/',
          },
      });
  
      if (error) {
          setErrorMessage(error.message);
          console.log(error);
      } else {
        
          // After successful payment, create the order in PocketBase
          
      }
      setLoading(false);
  };
  
    if (!clientSecret || !stripe || !elements) {
        return (
          <div className="flex items-center justify-center">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        );
      }

    

    return (
        <form onSubmit={handleSubmit} className='mx-3'>
            {clientSecret && <PaymentElement/>}

            {errorMesaage && <div>{errorMesaage}</div>}
            <button
            disabled={!stripe || loading}
            className='text-white w-full p-5 bg-black mt-2 rounded-md font-bold
            disabled:opacity-50 disabled:animate-pulse'>
              {!loading ? `Pagar $${amount} `: 'Procesando...'}
            </button>
        </form>
    );
}

export default CheckoutPage;