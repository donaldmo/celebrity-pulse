import { NextResponse } from 'next/server';
import Fans from '@/app/lib/mongodb/schema/users';
import { connectMongo } from '@/app/lib/mongodb';
import authOptions from '../auth/[...nextauth]/authOptions';
import { getServerSession } from "next-auth/next";
import { ObjectId } from 'mongodb';
import clientPromise from '@/app/lib/mongodb/db';


export async function POST(req) {
    try {
        const authHeader = req.headers.get('Authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new Error('Authorization header missing or invalid');
        }

        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            throw new Error('Session not found');
        }

        const { celebrityId, voteCount, contestId } = await req.json();

        console.log(
            "----------------------------------------------------\n",
            "| Route: '/api/vote/'                               |\n",
            "____________________________________________________\n"
        );

        console.table({ celebrityId, voteCount, contestId });

        // Ensure voteCount is a number (in case it's passed as a string)
        const voteCountNumber = Number(voteCount);
        if (isNaN(voteCountNumber)) {
            throw new Error('Invalid voteCount, must be a number');
        }

        const client = await clientPromise;

        const db = client.db(process.env.DB_NAME);
        const collection = db.collection('contests');
        const fansCollection = db.collection('fans');

        const fan = await fansCollection.findOne({ email: session?.user.email });

        console.log('Authenticated User: ');
        console.table({
            "Name": fan.name,
            "Email": fan.email,
            "Tokens": fan.tokens
        });

        if (fan.tokens < 0 || voteCountNumber > fan.tokens) {
            throw new Error('Insuficient tokens!')
        }

        const _id = new ObjectId(contestId);

        const result = await collection.updateOne(
            { _id, "votes.celebrity": new ObjectId(celebrityId) },
            {
                $inc: { "votes.$.voteCount": voteCountNumber }
            }
        );

        if (result.modifiedCount === 0) {
            // If no match was found, add the celebrity to the votes array
            const updateVote = await collection.updateOne(
                { _id }, // Match the contest
                {
                    $push: {
                        votes: {
                            voteCount: voteCountNumber,
                            celebrity: new ObjectId(celebrityId),
                            id: new ObjectId().toString()
                        }
                    }
                }
            );

            if (updateVote.modifiedCount === 0) {
                console.log('Failed to add a new vote');
                throw new Error('Failed to add a new vote');
            }
        }

        console.log('Vote Update: ')
        console.table({ result })

        // Deduct tokens from the user
        const updatedFan = await fansCollection.updateOne(
            { email: session?.user.email },
            { $inc: { tokens: -voteCountNumber } }
        );

        if (updatedFan.modifiedCount === 0) {
            throw new Error('Failed to deduct tokens from the user');
        }

        console.log('Fan"s tokens deducted: ', fan.tokens);

        const matchStage = { $match: { _id: new ObjectId(contestId) } };

        const lookupStage = {
            $lookup: {
                from: 'celebrities',
                localField: 'celebrities',
                foreignField: '_id',
                as: 'celebrities',
                pipeline: [
                    { $match: { _id: new ObjectId(celebrityId) } }
                ]
            }
        };

        const addFilteredVotesStage = {
            $addFields: {
                votes: {
                    $filter: {
                        input: '$votes',
                        as: 'vote',
                        cond: { $eq: ['$$vote.celebrity', new ObjectId(celebrityId)] }
                    }
                }
            }
        };

        const contest = await collection.aggregate([
            matchStage,
            lookupStage,
            addFilteredVotesStage
        ]).toArray();

        // Logging
        if (contest.length) {
            const { _id, name, votes } = contest[0];

            console.log('Contest: - After updating');
            console.table({ id: _id.toString(), name });

            if (votes) {
                console.log('Contest votes: ')
                console.table({
                    'voteCount': votes[0].voteCount,
                    'celebrity': votes[0].celebrity.toString(),
                    'id': votes[0].id
                })
            }
        }

        return NextResponse.json(contest[0]);

    } catch (error) {
        console.error("Error:", error.message);
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
