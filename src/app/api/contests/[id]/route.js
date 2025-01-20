import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/app/lib/mongodb/db';

export async function GET(req, { params }) {
    const { id } = params;
    const { searchParams } = req.nextUrl;
    const celebrity = searchParams.get('celebrity');

    console.log(celebrity)

    if (!id) {
        return NextResponse.json(
            { error: 'Contest ID is required' }, { status: 400 }
        );
    }

    try {
        const contestId = new ObjectId(id);

        const client = await clientPromise;
        const db = client.db(process.env.DB_NAME);
        const collection = db.collection('contests');

        const matchStage = { $match: { _id: new ObjectId(contestId) } };

        let lookupStage = {
            $lookup: {
                from: 'celebrities',
                localField: 'celebrities',
                foreignField: '_id',
                as: 'celebrities'
            }
        };

        if (celebrity) {
            const celebrityId = new ObjectId(celebrity);
            console.log('Celebrity ID: ', celebrityId)
            lookupStage = {
                $lookup: {
                    from: 'celebrities',
                    localField: 'celebrities',
                    foreignField: '_id',
                    as: 'celebrities',
                    pipeline: [
                        { $match: { _id: celebrityId } } 
                    ]
                }
            };
        }

        const contest = await collection.aggregate([
            matchStage,
            lookupStage
        ]).toArray();

        if (!contest || contest.length === 0) {
            return NextResponse.json(
                { error: 'Contest not found' }, { status: 404 }
            );
        }

        // Return the contest with the celebrities array (empty if no celebrities found)
        return NextResponse.json(contest[0]);
    } catch (error) {
        console.log('Error: ', error);
        return NextResponse.json(
            { error: 'Internal Server Error' }, { status: 500 }
        );
    }
}
