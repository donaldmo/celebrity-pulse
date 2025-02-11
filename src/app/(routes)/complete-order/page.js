import Navigation from '@/components/Navigation';
import NavigationContnet from '@/components/NavigationContent';
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
            return { message: await response.json(), error: false };
        } else {
            return { message: await response.json(), error: true };
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


        <main id="songs-one">
            <div id="songs-one-content">
                <Navigation />
                <NavigationContnet />

                <div className="heading">
                    <div className="text">COMPLETE ORDER</div>
                </div>

                <div className="center" style={{ color: "white" }}>
                    <p style={{ color: error ? 'red' : 'white' }}>{message?.message}</p>
                </div>

                <div className="center">
                    <button style={{ padding: '10px 20px', fontSize: '16px' }}>
                        <a href='/'>Return Home</a>
                    </button>
                </div>
            </div>
        </main>
    );
}
