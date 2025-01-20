import clientPromise from '@/app/lib/mongodb/db';
import { NextResponse } from 'next/server';


export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);
        const collection = db.collection('contests');

        const data = await collection.aggregate([
            {
                $lookup: {
                    from: 'media', // Name of the media collection
                    localField: 'media', // Field in contests referring to media ID
                    foreignField: '_id', // Field in media representing its ID
                    as: 'mediaDetails', // Field to populate media details
                },
            },
            {
                $unwind: {
                    path: '$mediaDetails', // Unwind mediaDetails to include as an object
                    preserveNullAndEmptyArrays: true, // Retain documents without matching media
                },
            },
        ]).toArray();

        return NextResponse.json(data);
    } catch (error) {
        console.log('Error: ', error)
        return NextResponse.json({ error }, { status: 500 });
    }
}