import { createOrder } from "@/app/lib/paypal";
import jwt from 'jsonwebtoken';
import Ticket from '@/app/lib/mongodb/schema/tickets';

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

export async function POST(request) {
  try {
    console.log(
      " ---------------------------------------------------\n",
      "| Route: '/api/create-order'                        |\n",
      " ___________________________________________________\n"
    );

    const invoice = await request.json();

    // const invoice = {
    //   metadata: {
    //     user_email: userData.email,
    //     product_id: selectedToken._id,
    //     product_item: "token"
    //   },
    //   amount: selectedToken.amount,
    //   currency: "ZAR",
    // };

    const ticket = await Ticket.findById({ _id });

    if (!ticket) {
        return NextResponse.json({
            error: "Ticket not found"
        }, { status: 404 });
    }

    console.log('Ticket Found: ')
    console.log(ticket)

    console.log('Invoice: ')
    console.table({ invoice })

    const data = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          items: [
            {
              name: `celebritypulse.asia_tokens_${product_id}`,
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
        return_url: `${process.env.BASE_URL}/complete-order`,
        cancel_url: `${process.env.BASE_URL}/cancel-order`,
        shipping_preference: 'NO_SHIPPING',
        user_action: 'PAY_NOW',
        brand_name: 'celebritypulse.asia',
      },
    }

    const approvalUrl = await createOrder(data);
    console.log('Approve Url: ', approvalUrl)

    const jwtToken = jwt.sign({
      email: invoice.metadata.user_email,
      tokenId: invoice.metadata.product_id
    },
      NEXTAUTH_SECRET
    );

    console.log("Encoded Token (No Expiration):", jwtToken);

    return new Response(JSON.stringify({
      approvalUrl, jwtToken
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
