import { capturePayment } from '@/app/lib/paypal';

export async function POST(req) {
    try {
        const { token, payerID } = await req.json();
        console.log('// POST: /api/complete-order')
        console.log("Token: ", token, "PayerID: ", payerID)

        if (!token || !payerID) {
            return new Response('Missing token or PayerID.', { status: 400 });
        }

        const order = await capturePayment(token);
        console.log('Order: ', order);

        return new Response('Course purchased successfully', { status: 200 });
    } catch (error) {
        console.log('Error: ', error)
        return new Response('Error: ' + error.message, { status: 500 });
    }
}