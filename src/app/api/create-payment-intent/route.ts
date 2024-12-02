import { NextRequest, NextResponse } from "next/server";
const stripe = require('stripe')('sk_test_51QRMbv2KVz3O8rlHoZv8PfMuOzOVXRtJa7T2q3yUaapp8ZdtuPxnXlL8n4eSGuzSV8lNSMHgrJdMWKPJebqH0E5800DjED6bX6');

export async function POST(request: NextRequest) {
    try {
        const { amount } = await request.json();
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "mxn",
            automatic_payment_methods: { enabled: true },
        });
        return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error("Internal Error:", error);
        //Handle other errors 
        return NextResponse.json({ error: `Internal server error: ${error} `}, { status: 500 });
    }

}