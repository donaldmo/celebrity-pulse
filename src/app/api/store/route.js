import { NextResponse } from 'next/server';
import ticketsData from '../../data/tickets_db.json';

export async function GET() {
    try {
        // Check if the data contains any tickets
        if (!ticketsData || !ticketsData.tickets || ticketsData.tickets.length === 0) {
            return NextResponse.json(
                { error: "No tickets found" },
                { status: 404 }
            );
        }

        // Return the list of tickets
        return NextResponse.json(ticketsData.tickets);

    } catch (error) {
        console.error("Error fetching tickets:", error);
        // Return a generic error response if something goes wrong
        return NextResponse.json(
            { error: "An error occurred while fetching tickets" },
            { status: 500 }
        );
    }
}
