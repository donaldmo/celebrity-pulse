import { NextResponse } from 'next/server';
import artistsData from '../../../../public/artists_db.json';

export async function GET() {
    try {
        return NextResponse.json(artistsData.artists);
    } catch (error) {
        return NextResponse.json({ error: "Failed to load artists" }, { status: 500 });
    }
}
