import { capturePayment } from '@/app/lib/paypal';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { token, payerID } = await req.json();

        if (!token || !payerID) {
            return NextResponse.json({ message: 'Missing token or PayerID.' }, { status: 400 });
        }

        const order = await capturePayment(token);
        console.log('Order: ', order);

        return NextResponse.json(
            { message: 'Course purchased successfully' }, { status: 200 }
        );
    } catch (error) {
        console.log('Error: ', error.message)
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
