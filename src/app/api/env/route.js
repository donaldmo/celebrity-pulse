import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const env = {
            cliendId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            nextAuthUrl: process.env.NEXTAUTH_URL,
            yokoPKey: process.env.YOCO_PUBLIC_KEY,
            yokoSKey: process.env.YOCO_SECRET_KEY,
            siteUrl: process.env.SITE_URL,
            nextAuthUrl: process.env.NEXTAUTH_URL,
            dbName: process.env.DB_NAME,
            dbUser: process.env.DB_USERNAME,
            dbPass: process.env.DB_PASSWORD,
        }
        return NextResponse.json({ env }, { status: 200 });
    } catch (error) {
        console.error('Error processing webhook:', error.message);
        return NextResponse.json({ error: 'Failed to process webhook' }, { status: 500 });
    }
}

