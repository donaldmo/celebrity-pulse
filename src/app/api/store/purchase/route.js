import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const invoice = await request.json();

    const response = await fetch('https://payments.yoco.com/api/checkouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.YOCO_SECRET_KEY}`,
      },
      body: JSON.stringify(invoice),
    });

    if (!response.ok) {
      const errorData = await response.json();

      if (errorData.description) {
        throw new Error(errorData.description)
      }
    }

    const data = await response.json();
    console.log('Yoco Results: ', data)

    return NextResponse.json(data);
  } catch (error) {

    console.log('Error: ', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
