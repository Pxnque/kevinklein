'use client'
import React,{useEffect,useState} from 'react';
import {
    useStripe,
    useElements,
    PaymentElement,
} from '@stripe/react-stripe-js';
import convertToSubcurrency from '@/app/lib/convertToSubcurrency';
const CheckoutPage = ({amount}: {amount:number}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMesaage,setErrorMessage] = useState<string>();
    const [clientSecret,setClientSecret] = useState("");
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        fetch('/api/chat/create-payment-intent',{
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
        if(!stripe || !elements){
            return;
        }
        const {error: submitError } = await elements.submit();
        if(submitError){
            setErrorMessage(submitError.message);
            setLoading(false);
            return;
        }
        const result = await stripe.confirmCardPayment(clientSecret,{
            payment_method: {
                card: elements.getElement(PaymentElement),
            },
        });
        if(result.error){
            setErrorMessage(result.error.message);
            setLoading(false);
        }else{
            setErrorMessage(undefined);
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className='mx-3'>
            {clientSecret && <PaymentElement/>}

            {errorMesaage && <div>{errorMesaage}</div>}
            <button>Pagar</button>
        </form>
    );
}

export default CheckoutPage;