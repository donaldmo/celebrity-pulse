import { connectMongo } from "../../../lib/mongodb";
import Fans from '../../../lib/mongodb/schema/users';
import { NextResponse } from 'next/server';

export async function POST(req) {
	try {
		await connectMongo();
		const body = await req.json()
		const { name, email, image, login } = body;
		const time = new Date().toISOString();

		if (!email) {
			return NextResponse.json({
				message: 'Email is required'
			}, { status: 500 });
		}

		let fan = await Fans.findOne({ email });

		if (fan) {
			fan.login = {
				expires: login.expires,
				time: time,
			};

			await fan.save();

			return NextResponse.json(
				{ message: 'Fan login updated', fan }, { status: 200 }
			);
		}

		if (!fan) {
			const newFan = new Fans({
				name,
				email,
				image,
				login: {
					expires: login.expires,
					time: time,
				},
			});

			await newFan.save();

			return NextResponse.json({
				message: 'New user created',
				user: newFan
			}, { status: 201 });
		}

	} catch (error) {
		console.error('Error in /api/auth/login:', error);

		return NextResponse.json({
			message: 'Internal Server Error'
		}, { status: 500 });
	}
}