import { ObjectId } from 'mongodb';
import nodemailer from 'nodemailer';
import { capturePayment } from '@/app/lib/paypal';
import { NextResponse } from 'next/server';
import { purchaseTemplate } from "@/app/lib/email-template/purchaseTemplate";

import Ticket from '@/app/lib/mongodb/schema/tickets';
import Fans from "@/app/lib/mongodb/schema//users";

import { connectMongo } from '@/app/lib/mongodb';

export async function POST(req) {
    try {
        console.log(
            " ---------------------------------------------------\n",
            "| Route: '/api/complete-order'                      |\n",
            " ___________________________________________________\n"
        );
        const { token, payerID, tokenId } = await req.json();
        console.table({ token, payerID, tokenId });

        await connectMongo();

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

        if (!tokenId) {
            return NextResponse.json({
                error: "Faild, Token not found"
            }, { status: 400 });
        }

        console.log('Fetching Ticket token: ', tokenId)
        const ticket = await Ticket.findById({ _d: new ObjectId(tokenId) });

        if (!ticket) {
            return NextResponse.json({
                error: "Token not found!"
            }, { status: 404 });
        }
        console.log('Ticket token Found: ', ticket);

        console.log('Fetching User: ')
        const fan = await Fans.findOne({ email: decodedData.email });

        if (!fan) {
            return NextResponse.json({
                error: "User not found!"
            }, { status: 404 });
        }
        console.log('User Found: ', fan)

        console.log('Capturing PayPal Payment:')
        const order = await capturePayment(token); // Assuming `capturePayment` only needs the token
        console.log('PayPal Payment: ', order);

        fan.purchases = [...fan.purchases, order];
        fan.tokens = Number(fan.tokens) + Number(ticket.amount);

        console.log('Saving Users Purchase')
        const updateFan = await fan.save();
        console.log("updated fan: ", updateFan);

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

        const emailResponse = await transporter.sendMail({
            from: '"Celebrity Pulse" <donald@codegarden.co.za>', // your email as admin
            to: userEmail,
            subject: `Celebrity Pulse Tokens Purchased.`,
            html: purchaseTemplate(ticket),
        });

        console.log("Email Response: ", emailResponse);

        return NextResponse.json({ status: 'success' }, { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response('Error: ' + error.message, { status: 500 });
    }
}
