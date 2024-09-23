import nodemailer from 'nodemailer';
import Ticket from '@/app/lib/mongodb/schema/tickets';
import { NextResponse } from 'next/server';
import { connectMongo } from '../../../lib/mongodb';
import Users from "../../../lib/mongodb/schema/users";
import { purchaseTemplate } from "../../../lib/email-template/purchaseTemplate";

export async function POST(request) {
    try {
        const body = await request.json();
        console.log('Received webhook data: ', body);

        const { metadata } = body.payload;
        const userEmail = metadata.user_email;
        const _id = metadata.product_id;

        await connectMongo();

        const ticket = await Ticket.findById({ _id });

        if (!ticket) {
            return NextResponse.json({
                error: "Ticket not found"
            }, { status: 404 });
        }

        const user = await Users.findOne({ email: userEmail });

        if (!user) {
            return NextResponse.json({
                error: "User not found"
            }, { status: 404 });
        }

        user.purchases = [...user.purchases, body];
        await user.save();
        console.log("updated user: ", user._id);

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
            subject: `Ticket Purchased.`,
            html: purchaseTemplate(ticket),
        });

        console.log("Email Response: ", emailResponse);

        return NextResponse.json({ status: 'success' }, { status: 200 });
    } catch (error) {
        console.error('Error processing webhook:', error.message);
        return NextResponse.json({ error: 'Failed to process webhook' }, { status: 500 });
    }
}
