import { createOrder } from "@/app/lib/paypal";
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "../auth/[...nextauth]/authOptions";
import clientPromise from "@/app/lib/mongodb/db";
import { ObjectId } from 'mongodb';

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

export async function POST(request) {
  try {
    console.log(
      " ---------------------------------------------------\n",
      "| Route: '/api/create-order'                        |\n",
      " ___________________________________________________\n"
    );

    /**
     * @type {import('@/app/lib/invoice').Invoice}
     */
    const invoice = await request.json();
    console.table({ invoice })

    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Authorization header missing or invalid');
    }

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      throw new Error('Session not found');
    }
    console.log('Session: ', session)

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('tickets');

    const ticket = await collection.findOne({
      _id: new ObjectId(invoice.metadata.product_id)
    });

    if (!ticket) {
      return NextResponse.json({
        error: "Ticket not found"
      }, { status: 404 });
    }

    console.log('Ticket Found: ')
    console.log(ticket)

    const jwtToken = jwt.sign({
      email: invoice.metadata.user_email,
      tokenId: invoice.metadata.product_id
    },
      NEXTAUTH_SECRET
    );

    console.log('jwt sign: ', jwtToken)

    const data = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          items: [
            {
              name: `celebritypulse.asia_tokens_${ticket._id.toString()}`,
              description: `Celebrity Pulse ${ticket.amount} tokens, each valued at ${ticket?.price}`,
              quantity: 1,
              unit_amount: {
                currency_code: ticket.currency,
                value: ticket.amount,
              },
            },
          ],
          amount: {
            currency_code: ticket.currency,
            value: ticket.amount,
            breakdown: {
              item_total: {
                currency_code: ticket.currency,
                value: ticket.amount,
              },
            },
          },
        },
      ],
      application_context: {
        return_url: `${process.env.BASE_URL}/complete-order?productId=${jwtToken}`,
        cancel_url: `${process.env.BASE_URL}/cancel-order`,
        shipping_preference: 'NO_SHIPPING',
        user_action: 'PAY_NOW',
        brand_name: 'celebritypulse.asia',
      },
    }

    const approvalUrl = await createOrder(data);

    return new Response(JSON.stringify({
      approvalUrl
    }), {
      status: 200, headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.log('Error: ', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
