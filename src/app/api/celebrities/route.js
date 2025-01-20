import clientPromise from '@/app/lib/mongodb/db';
import { NextResponse } from 'next/server';
// import artistsData from '../../data/artists_db.json';

export async function GET() {
    try {
        // Check if the data contains any artists
        // if (!artistsData || !artistsData.artists || artistsData.artists.length === 0) {
        //     return NextResponse.json(
        //         { error: "No artists found" },
        //         { status: 404 }
        //     );
        // }

        // Return the list of artists
        // return NextResponse.json(artistsData.artists);

        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);
        const collection = db.collection('celebrities');

        const data = await collection.find({}).toArray();
        console.log('Data: ', data)

        return NextResponse.json(data);

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error }, { status: 500 });
    }
}