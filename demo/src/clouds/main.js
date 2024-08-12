const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const crypto = require('crypto');

// The example below shows you how a cloud code function looks like.

// Parse Server 3.x
Parse.Cloud.define("hello", (request) => {
  return ("Hello world!");
});

// Function to create a checkout session using Yoco's API
Parse.Cloud.define("create-checkout", async (request) => {
  const axios = require('axios');

  // Extract parameters from the request
  const { amount, currency, successUrl, cancelUrl, failureUrl } = request.params;

  // Replace with your Yoco secret key
  const YOCO_SECRET_KEY = 'sk_test_a27f36bfRgzl33N218448d5b44ac';

  try {
    // Make the request to Yoco's Checkout API
    const response = await axios.post(
      'https://payments.yoco.com/api/checkouts',
      {
        amount,
        currency,
        successUrl,
        cancelUrl,
        failureUrl,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${YOCO_SECRET_KEY}`,
        },
      }
    );

    // Return the relevant data to the client
    console.log(response.data);
    return response.data;

  } catch (error) {
    console.error('Error creating checkout:', error.response ? error.response.data : error.message);
    throw new Parse.Error(500, 'Failed to create checkout');
  }
});

Parse.Cloud.define("register-webhook", async (request) => {
  const { secretKey, webhookUrl } = req.body;

  try {
    const response = await fetch('https://payments.yoco.com/api/webhooks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${secretKey}`,
      },
      body: JSON.stringify({
        name: 'my-webhook',
        url: webhookUrl,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      res.status(201).json(data);
    } else {
      res.status(response.status).json(data);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to register webhook' });
  }
});

Parse.Cloud.define("webhook", async (request) => {
  // Extract the event object from the request
  const event = request.params; // Use `request.params` for query parameters or `request.body` if sending raw body

  // Log the event for debugging
  console.log('Received event:', event);

  if (event.type === 'payment.succeeded') {
    // Handle successful payment
    const paymentDetails = event.payload;
    console.log('Payment succeeded:', paymentDetails);

    // Example: Update your Parse database or perform other actions
    // const Order = Parse.Object.extend('Order');
    // const order = new Order();
    // order.set('paymentDetails', paymentDetails);
    // await order.save();
  }

  // Return a 200 response to acknowledge receipt of the event
  res.status(200).json(paymentDetails)
  return 'Event received';
});
/* require("./test.js"); */
