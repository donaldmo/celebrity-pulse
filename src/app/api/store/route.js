import { NextResponse } from 'next/server';
import { connectMongo } from "../../lib/mongodb"
import Ticket from "../../lib/mongodb/schema/tickets"

export async function GET() {
    try {
        await connectMongo();

        /**
         * `.lean()` returns plain JavaScript objects, not Mongoose documents.
         */
        const tickets = await Ticket.find().lean();

        // Check if the data contains any tickets
        if (!tickets || tickets.length === 0) {
            return NextResponse.json(
                { error: "No tickets found" },
                { status: 404 }
            );
        }

        return NextResponse.json(tickets, { status: 200 });

    } catch (error) {
        console.error("Error fetching tickets:", error);
        
        return NextResponse.json(
            { error: "An error occurred while fetching tickets" },
            { status: 500 }
        );
    }
}
