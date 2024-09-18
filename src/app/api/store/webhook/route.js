import Ticket from '@/app/lib/mongodb/schema/tickets';
import { NextResponse } from 'next/server';
import { connectMongo } from '../../../lib/mongodb';
import Users from "../../../lib/mongodb/schema/users"

export async function POST(request) {
    try {
        const body = await request.json();
        const { user_id, purchase } = body;

        console.log('Received webhook data:', body);

        await connectMongo();

        // const ticket = await Ticket.findById(purchase._id);
        // console.log("Ticket: ", ticket);

        // if (!ticket) {
        //     return NextResponse.json({
        //         error: "Ticket not found"
        //     }, { status: 404 });
        // }

        // const user = await Users.findById(user_id);

        // if (!user) {
        //     return NextResponse.json({
        //         error: "User not found"
        //     }, { status: 404 });
        // }

        // user.purchases = [...user.purchases, body];
        // await user.save();
        // console.log("updated user: ", user._id);

        return NextResponse.json({ status: 'success' }, { status: 200 });
    } catch (error) {
        console.error('Error processing webhook:', error.message);
        return NextResponse.json({ error: 'Failed to process webhook' }, { status: 500 });
    }
}
