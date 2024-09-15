import { NextResponse } from 'next/server';
import artistsData from '../../../data/artists_db.json';
import { createSlug } from '../../../utils';

export async function GET(req, { params }) {
    const { slug } = params;

    // Find the artist matching the slug
    const artist = artistsData.artists.find(
        (artist) => createSlug(artist.name) === slug
    );

    // If artist is not found, return a 404 response
    if (!artist) {
        return NextResponse.json(
            { error: "Artist not found" },
            { status: 404 }
        );
    }

    // If artist is found, return the artist data
    return NextResponse.json(artist);
}
