import { NextResponse } from 'next/server';
import artistsData from '../../data/artists_db.json';

export async function GET() {
    try {
        // Check if the data contains any artists
        if (!artistsData || !artistsData.artists || artistsData.artists.length === 0) {
            return NextResponse.json(
                { error: "No artists found" },
                { status: 404 }
            );
        }

        // Return the list of artists
        return NextResponse.json(artistsData.artists);

    } catch (error) {
        console.error("Error fetching artists:", error);
        // Return a generic error response if something goes wrong
        return NextResponse.json(
            { error: "An error occurred while fetching artists" },
            { status: 500 }
        );
    }
}