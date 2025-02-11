import { createOrder } from '@/app/lib/paypal';
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { ObjectId } from 'mongodb';

import authOptions from '../auth/[...nextauth]/authOptions';
import clientPromise from '@/app/lib/mongodb/db';

export async function POST(req) {
  try {
    const { invoice } = await req.json();
    const { currency, amount, price } = invoice;
    const { user_email, product_id, product_item } = invoice.metadata;

    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Authorization header missing or invalid');
    }

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      throw new Error('Session not found');
    }

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const ticketCollection = db.collection('tickets');

    console.log('Invoice: ', invoice);

    if (!invoice) {
      throw new Error('Invoice data missing.');
    }

    const ticket = await ticketCollection.findOne({
      _id: new ObjectId(invoice.metadata.product_id)
    });

    if (!ticket) {
      return NextResponse.json({
        error: "Token not found!"
      }, { status: 404 });
    }

    const data = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          items: [
            {
              name: `Tokens_${product_id}`,
              description: `$${price}celebrityPulse.asia tokens to vote for your favorite celebrity in the contest.`,
              quantity: 1,
              unit_amount: {
                currency_code: currency,
                value: Number(amount),
              },
            },
          ],
          amount: {
            currency_code: currency | 'USD',
            value: amount,
            breakdown: {
              item_total: {
                currency_code: currency | 'USD',
                value: Number(amount),
              },
            },
          },
        },
      ],
      application_context: {
        return_url: `${process.env.BASE_URL}/complete-order`,
        cancel_url: `${process.env.BASE_URL}/cancel-order`,
        shipping_preference: 'NO_SHIPPING',
        user_action: 'PAY_NOW',
        brand_name: 'celebritypulse.asia',
      },
    }

    const approvalUrl = await createOrder(invoice);
    console.log('Approval Url: ', approvalUrl);

    return NextResponse.json({ approvalUrl }, { status: 200 });
  } catch (error) {
    console.error('Error: ', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
