import React, { useEffect, useState } from 'react';

function Demo() { // Component name updated to "Demo"
    const [response, setResponse] = useState('');

    useEffect(() => {
        callHelloFunction();
    }, []);

    const callHelloFunction = async () => {
        try {
            const res = await fetch('https://parseapi.back4app.com/functions/hello', {
                method: 'POST',
                headers: {
                    'X-Parse-Application-Id': 'jo4wRrT8Yp5mhrY3mvkM3Dcl7j3fcLnDvYAxmrGZ',
                    'X-Parse-REST-API-Key': 'h7d13a90kyIYHx5HCLWkbMxDUfXdLokEfpJEK6l4',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}), // Empty body as in the curl example
            });

            const result = await res.json();
            setResponse(result.result); // Update state with the result
        } catch (error) {
            console.error('Error calling cloud function:', error);
            setResponse('Error calling cloud function');
        }
    };

    const handleCheckout = async () => {
        try {
            const response = await fetch('https://parseapi.back4app.com/functions/create-checkout', {
                method: 'POST',
                headers: {
                    'X-Parse-Application-Id': 'jo4wRrT8Yp5mhrY3mvkM3Dcl7j3fcLnDvYAxmrGZ', // Include your Parse app ID
                    'X-Parse-REST-API-Key': 'h7d13a90kyIYHx5HCLWkbMxDUfXdLokEfpJEK6l4', // Include your Parse REST API key
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: 900, // Amount in cents
                    currency: 'ZAR',
                    successUrl: 'http://localhost:3000/success',
                    cancelUrl: 'http://localhost:3000/cancel',
                    failureUrl: 'http://localhost:3000/failure',
                }),
            });

            const data = await response.json();
            if (data.redirectUrl) {
                window.location.href = data.redirectUrl; // Redirect to the payment page
            } else {
                console.error('Failed to create checkout:', data);
            }
        } catch (error) {
            console.error('Error creating checkout:', error);
        }
    };

    return (
        <div className="Demo">
            <h1>Cloud Function Response</h1>
            <p>{response}</p>
            <button onClick={handleCheckout}>Start Checkout</button>
        </div>
    );
}

export default Demo;
