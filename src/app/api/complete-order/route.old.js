import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { capturePayment } from '@/app/lib/paypal';
import { NextResponse } from 'next/server';
import { purchaseTemplate } from "@/app/lib/email-template/purchaseTemplate";
import { ObjectId } from 'mongodb';

import clientPromise from '@/app/lib/mongodb/db';
import { getServerSession } from 'next-auth';
import authOptions from '../auth/[...nextauth]/authOptions';

export async function POST(req) {
    try {
        console.log(
            " ---------------------------------------------------\n",
            "| Route: '/api/complete-order'                      |\n",
            " ___________________________________________________\n"
        );
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
        console.log('Session: ')
        console.log(session)

        /**
         * ====================================================================================
         */
        // Example usage:
        // const userData = { email: "example@example.com" };
        // const ticket = { _id: "12345", amount: 100 };

        // const invoice = new Invoice(userData.email, ticket._id, "token", ticket.amount);

        // invoice.printInvoice();
        /**
         * ====================================================================================
         */

        if (!token || !payerID) {
            return new Response('Missing token or PayerID.', { status: 400 });
        }

        if (!productId) {
            return NextResponse.json({
                error: "Faild, Token not found"
            }, { status: 400 });
        }

        let decodedData = jwt.verify(productId, process.env.NEXTAUTH_SECRET);
        console.log('Decoded JWT:', decodedData);


        console.log('Fetching Ticket token: ', decodedData.tokenId)

        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);
        const fansCollection = db.collection('fans')
        const ticketCollection = db.collection('tickets');

        const ticket = await ticketCollection.findOne({
            _id: new ObjectId(decodedData.tokenId)
        });

        if (!ticket) {
            return NextResponse.json({
                error: "Token not found!"
            }, { status: 404 });
        }
        console.log('Ticket token Found: ', ticket);

        const fan = await fansCollection.findOne({ email: session.user.email });
        if (!fan) {
            return NextResponse.json({ error: "User not found!" }, { status: 404 });
        }

        console.log('Capturing payment: ')
        const order = await capturePayment(token);

        fan.purchases = [...(fan.purchases || []), order];
        fan.tokens = (Number(fan.tokens) || 0) + Number(ticket.amount);

        console.log('Updating Fan Purchases and Tokens...');
        const updateFan = await fansCollection.updateOne(
            { email: session.user.email },
            { $set: { purchases: fan.purchases, tokens: fan.tokens } }
        );

        console.log("Updated fan: ", updateFan);

        let transporter = nodemailer.createTransport({
            host: 'mail.codegarden.co.za',
            port: 465, // or 587
            secure: true, // use SSL
            auth: {
                user: 'donald@codegarden.co.za',
                pass: '!@passw0$1234',
            },
            tls: {
                rejectUnauthorized: false, // Disables certificate verification
            },
        });

        // const emailResponse = await transporter.sendMail({
        //     from: '"Celebrity Pulse" <donald@codegarden.co.za>', // your email as admin
        //     to: userEmail,
        //     subject: `Celebrity Pulse Tokens Purchased.`,
        //     html: purchaseTemplate(ticket),
        // });

        // console.log("Email Response: ", emailResponse);

        return NextResponse.json({ status: 'success' }, { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response('Error: ' + error.message, { status: 500 });
    }
}
