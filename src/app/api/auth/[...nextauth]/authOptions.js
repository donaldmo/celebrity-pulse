import GoogleProvider from 'next-auth/providers/google';

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                // Save access token from the provider (e.g., Google) into the JWT
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.sub;
                session.user.email = token.email;
                session.user.name = token.name;
                session.accessToken = token.accessToken; // Pass the access token to the session
            }
            return session;
        },
    },
};

export default authOptions;