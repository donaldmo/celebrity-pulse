import { redirect } from 'next/navigation';

async function completeOrder(token, payerID, productId) {
    if (!token || !payerID) {
        return { message: 'Missing payment information', error: true };
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/complete-order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, payerID, productId }),
        });

        if (response.ok) {
            return { message: await response.text(), error: false };
        } else {
            return { message: await response.text(), error: true };
        }
    } catch {
        return { message: 'An unexpected error occurred.', error: true };
    }
}

export default async function CompleteOrderPage({ searchParams }) {
    const { token, PayerID, productId } = searchParams;

    if (!token || !PayerID) {
        redirect('/');
    }

    const { message, error } = await completeOrder(token, PayerID, productId);

    return (
        <main>
            <h1>Complete Order</h1>
            <p style={{ color: error ? 'red' : 'white' }}>{message}</p>
            <a href="/" style={{ color: 'blue' }}>
                Return to Home
            </a>
        </main>
    );
}
