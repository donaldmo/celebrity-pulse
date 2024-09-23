import { NextResponse } from 'next/server';
import { connectMongo } from '../../../lib/mongodb';
import Ticket from '../../../lib/mongodb/schema/tickets';
import ticketsData from '../../../data/tickets_db.json';

export async function POST(request) {
  try {
    // Connect to MongoDB
    await connectMongo();

    // Extract tickets from JSON data
    const tickets = ticketsData.tickets;

    // Check if the tickets collection is empty
    const existingTickets = await Ticket.countDocuments();

    if (existingTickets > 0) {
      return NextResponse.json({ message: "Tickets already exist in the database." }, { status: 409 });
    }

    // Validate the data (optional but recommended)
    if (!Array.isArray(tickets)) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
    }

    // Save each ticket to the database
    const savedTickets = [];
    for (const ticket of tickets) {
      const newTicket = new Ticket(ticket);
      await newTicket.save();
      savedTickets.push(newTicket);
    }

    // Return the saved tickets as JSON
    return NextResponse.json({ tickets: savedTickets }, { status: 201 });
  } catch (error) {
    console.error("Error saving tickets", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}