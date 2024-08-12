import React, { useEffect, useState } from 'react';

function App() { // Component name updated to "App"
	const [response, setResponse] = useState('');
	const [redirectUrl, setRedirectUrl] = useState(null);

	useEffect(() => {
		registerWebhook();
	}, []);

	const registerWebhook = async () => {
		try {
			const webhookUrl = 'https://parseapi.back4app.com/functions/webhook';

			const response = await fetch('https://parseapi.back4app.com/functions/register-webhook', {
				method: 'POST',
				headers: {
					'X-Parse-Application-Id': 'jo4wRrT8Yp5mhrY3mvkM3Dcl7j3fcLnDvYAxmrGZ',
					'X-Parse-REST-API-Key': 'h7d13a90kyIYHx5HCLWkbMxDUfXdLokEfpJEK6l4',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					secretKey: 'sk_test_a27f36bfRgzl33N218448d5b44ac',
					webhookUrl: webhookUrl,
				}),
			});

			const data = await response.json();
			console.log('Webhook registration response:', data);
		} catch (error) {
			console.error('Error registering webhook:', error);
		}
	};

	const handleCheckout = async () => {
		try {
			const response = await fetch('https://parseapi.back4app.com/functions/create-checkout', {
				method: 'POST',
				headers: {
					'X-Parse-Application-Id': 'jo4wRrT8Yp5mhrY3mvkM3Dcl7j3fcLnDvYAxmrGZ',
					'X-Parse-REST-API-Key': 'h7d13a90kyIYHx5HCLWkbMxDUfXdLokEfpJEK6l4',
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
			console.log(data.result.redirectUrl)

			if (data.result.redirectUrl) {
				window.location.href = data.result.redirectUrl; // Redirect to the payment page
			} else {
				console.error('Failed to create checkout:', data);
			}
		} catch (error) {
			console.error('Error creating checkout:', error);
		}
	};

	const handleHelloFunction = async () => {
		try {
			const res = await fetch('https://parseapi.back4app.com/functions/hello', {
				method: 'POST',
				headers: {
					'X-Parse-Application-Id': 'jo4wRrT8Yp5mhrY3mvkM3Dcl7j3fcLnDvYAxmrGZ',
					'X-Parse-REST-API-Key': 'h7d13a90kyIYHx5HCLWkbMxDUfXdLokEfpJEK6l4',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({}),
			});

			const result = await res.json();
			setResponse(result.result);
		} catch (error) {
			console.error('Error calling cloud function:', error);
			setResponse('Error calling cloud function');
		}
	};

	return (
		<div className="App">
			<h1>Cloud Function Response</h1>
			<p>{response}</p>
			<button onClick={handleHelloFunction}>Call Hello Function</button>
			<button onClick={handleCheckout}>Create Checkout</button>
			{redirectUrl && (
				<div>
					<p>Redirect to checkout:</p>
					<a href={redirectUrl} target="_blank" rel="noopener noreferrer">
						Go to Checkout
					</a>
				</div>
			)}
		</div>
	);
}

export default App;
