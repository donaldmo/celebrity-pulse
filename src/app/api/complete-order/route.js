import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { ObjectId } from 'mongodb';

import clientPromise from '@/app/lib/mongodb/db';
import { capturePayment } from '@/app/lib/paypal';
import authOptions from '../auth/[...nextauth]/authOptions';
import { purchaseTemplate } from "@/app/lib/email-template/purchaseTemplate";

const PaymentName = Object.freeze({
    PAYPAL: 'PAYPAL',
    YOCO: 'YOCO'
});

export async function POST(req) {
    try {
        const { token, payerID, productId } = await req.json();
        console.log({ token, payerID, productId });

        const authHeader = req.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new Error('Authorization header missing or invalid');
        }

        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            throw new Error('Session not found');
        }

        if (!token || !payerID) {
            return NextResponse.json({ message: 'Missing token or PayerID.' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);
        const fansCollection = db.collection('fans');

        const order = await capturePayment(token);
        console.log('Order: ', order);

        if (order.status === 'COMPLETED') {
            console.log('Order completed');

            const userEmail = invoice.metadata.user_email;

            if (!userEmail) {
                throw new Error("User email not found in invoice metadata");
            }

            const fan = await fansCollection.findOne({ email: userEmail });

            if (!fan) {
                throw new Error("Fan not found for the provided email");
            }

            console.log("Fan: ", fan);

            // Update fan's purchase records
            const orderDetails = {
                ...order,
                payment_name: PaymentName.PAYPAL
            };

            console.log('Updating Fan Purchases and Tokens...');

            const updateFan = await fansCollection.updateOne(
                { email: session.user.email },
                {
                    $push: { purchases: orderDetails },
                    $inc: { tokens: Number(invoice.amount) }
                }
            );

            if (updateFan.modifiedCount === 1) {
                console.log('Fan purchases and tokens successfully updated');
            } else {
                console.error('Failed to update fan information');
            }

            console.log("Order successfully saved");
        }

        return NextResponse.json(
            { message: 'Course purchased successfully' }, { status: 200 }
        );
    } catch (error) {
        console.log('Error: ', error.message)
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
