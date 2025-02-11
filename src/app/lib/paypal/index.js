import axios from 'axios';

const PAYPAL_BASE_URL = process.env.PAYPAL_BASE_URL;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;

async function generateAccessToken() {
    const response = await axios({
        url: `${PAYPAL_BASE_URL}/v1/oauth2/token`,
        method: 'post',
        data: 'grant_type=client_credentials',
        auth: {
            username: PAYPAL_CLIENT_ID,
            password: PAYPAL_SECRET,
        },
    });

    return response.data.access_token;
}

export async function createOrder(invoice) {
    const accessToken = await generateAccessToken();
    console.log('invoice: ', invoice)
    
    const {
        currency,
        price,
        amount,
        metadata: { user_email, product_id, product_item } = {}
    } = invoice || {};

    const data = {
        intent: 'CAPTURE',
        purchase_units: [
            {
                items: [
                    {
                        name: `Tokens_${product_id}`,
                        description: 'celebritypulse.asia tokens to vote for your favorite celebrity in the contest.',
                        quantity: 1,
                        unit_amount: {
                            currency_code: 'USD',
                            value: `${price}`,
                        },
                    },
                ],
                amount: {
                    currency_code: 'USD',
                    value: `${price}`,
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: `${price}`,
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
            brand_name: 'manfra.io',
        },
    }

    const response = await axios({
        url: `${PAYPAL_BASE_URL}/v2/checkout/orders`,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        data: JSON.stringify(data),
    });

    return response.data.links.find((link) => link.rel === 'approve').href;
}

export async function capturePayment(orderId) {
    const accessToken = await generateAccessToken();

    const response = await axios({
        url: `${PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return response.data;
}