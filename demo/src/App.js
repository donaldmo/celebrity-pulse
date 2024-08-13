import React, { useEffect, useState } from 'react';

function App() { // Component name updated to "App"
	const [response, setResponse] = useState('');
	const [redirectUrl, setRedirectUrl] = useState(null);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
  
	useEffect(() => {
	  const createWebhook = async () => {
		try {
		  const res = await fetch('https://payments.yoco.com/api/webhooks', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			  'Authorization': 'Bearer sk_test_a27f36bfRgzl33N218448d5b44ac'
			},
			body: JSON.stringify({
			  name: 'celebrity-pulse',
			  url: 'https://parseapi.back4app.com/functions/webhook-endpoint'
			})
		  });
  
		  if (!res.ok) {
			throw new Error('Network response was not ok');
		  }
  
		  const result = await res.json();
		  console.log("CREATE WEBHOOK: ", result)
		  setResponse(result);
		} catch (error) {
		  setError(error);
		} finally {
		  setLoading(false);
		}
	  };
  
	  createWebhook();
	}, []);

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
					currency: 'ZAR'
				}),
			});

			const data = await response.json();
			console.log(data.result)

			if (data.result.redirectUrl) {
				window.location.href = data.result.redirectUrl;
			} else {
				console.error('Failed to create checkout:', data);
			}
		} catch (error) {
			console.error('Error creating checkout: ', error);
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
