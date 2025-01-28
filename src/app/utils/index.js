/**
 * 
 * @param {*} name 
 * @returns slug
 */
export function createSlug(name) {
    return name
        .toLowerCase()          // Convert to lowercase
        .replace(/\s+/g, '-')   // Replace spaces with hyphens
        .replace(/[^a-z0-9\-]/g, ''); // Remove any non-alphanumeric characters except hyphens
}

/**
 * Send Login Data to the Database
 * @param {*} session 
 * @returns {User}
 */
export async function sendLoginData(session) {
    try {
        const { name, email, image } = session.user;
        const { expires } = session;

        const payload = {
            name,
            email,
            image,
            login: { expires },
        };

        // Send a POST request to /api/auth/login
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        // Check if the response status is not ok
        if (!response.ok) {
            const resultError = await response.json();
            console.log('Response Error: ', resultError.error)
            throw new Error(resultError.error);
        }

        const result = await response.json();
        console.log('Result: ', result)

        // Validate the expected structure in the response
        if (!result?.user) {
            throw new Error('Invalid response format from login API');
        }

        return result.user;

    } catch (error) {
        console.log('Error: ', error)
        throw new Error('Fetch Failed...');
    }
}


/**
 * 
 * @param {*} params 
 * @returns 
 */
export async function fetchTickets() {
    try {
        const response = await fetch('/api/store');

        if (!response.ok) {
            throw new Error('Failed to fetch tickets');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

/**
 * 
 * @param {*} invoice 
 * @returns 
 */
export async function handleYoco(invoice) {
    try {
        const response = await fetch('/api/store/purchase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(invoice),
        });

        if (!response.ok) {
            const resultError = await response.json();
            console.log('Response Error: ', resultError.error)
            throw new Error(resultError.error);
        }

        const result = await response.json();

        if (!result.redirectUrl) {
            throw new Error('No redirect URL returned from the server.');
        }

        return result.redirectUrl;
    } catch (error) {
        throw new Error(error.message);
    }
}

const handlePaypal = async () => {
    try {
        console.log('HANDLE PAY')
        const response = await fetch('/api/create-order', { method: 'POST' });

        if (response.ok) {
            const { approvalUrl } = await response.json();

            window.location.href = approvalUrl;
        } else {
            const { error } = await response.json();
            console.error('Error creating order:', error);
            alert('Failed to create order. Please try again.');
        }
    } catch (err) {
        console.error('Error:', err);
        alert('An unexpected error occurred. Please try again.');
    }
};


export async function celebrityVote(session) {
    try {
        const { name, email, image } = session.user;
        const { expires } = session;

        const payload = {
            name,
            email,
            image,
            login: { expires },
        };

        // Send a POST request to /api/auth/login
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const resultError = await response.json();
            console.log('Response Error: ', resultError.error)
            throw new Error(resultError.error);
        }

        console.log('Response: ', response)

        return true
    } catch (error) {
        console.log('Fetch Error: ', error.message)
        throw new Error(error.message);
    }
}

export const handlePayPal = async (invoice) => {
    try {
        console.log('HANDLE PAY_PAL')

        const response = await fetch('/api/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(invoice),
        });

        if (response.ok) {
            const { approvalUrl } = await response.json();
            // window.location.href = approvalUrl;

            return approvalUrl;
        } else {
            const { error } = await response.json();
            console.error('Error creating order:', error);
            alert('Failed to create order. Please try again.');
        }
    } catch (err) {
        console.error('Error:', err);
        alert('An unexpected error occurred. Please try again.');
    }
};