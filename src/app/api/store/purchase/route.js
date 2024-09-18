import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { amount, currency } = await request.json();
        console.log(amount, currency)
        const response = await fetch('https://payments.yoco.com/api/checkouts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.YOCO_SECRET_KEY}`, // Use your actual secret key
            },
            body: JSON.stringify({
                amount,
                currency,
                // Add other necessary fields as required by the Yoco API
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to create checkout');
        }

        const data = await response.json();
        return NextResponse.json(data); // Return the response to the client
    } catch (error) {
        console.error('Error creating checkout:', error);
        return NextResponse.json({ error: 'Failed to process webhook' }, { status: 500 });
    }
}
