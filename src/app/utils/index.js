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
            const errorDetails = await response.text(); // Fetch server's response text for debugging
            // console.error(`Login request failed: ${response.status} - ${errorDetails}`);
            throw new Error(`Failed to log user information. Status: ${response.status}`);
        }

        const result = await response.json();

        // Validate the expected structure in the response
        if (!result?.user) {
            // console.error('Unexpected response format:', result);
            throw new Error('Invalid response format from login API');
        }

        return result.user;

    } catch (error) {
        // Gracefully log and throw an enhanced error
        // console.error('An error occurred while sending login data:', error.message);
        throw new Error(error.message);
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
export async function purchaseTicket(invoice) {
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
