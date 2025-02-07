import { createOrder } from '@/app/lib/paypal';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const approvalUrl = await createOrder();
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
