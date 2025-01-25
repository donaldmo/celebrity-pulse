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
		}

		if (!fan) {
			const fan = new Fans({
				name,
				email,
				image,
				login: {
					expires: login.expires,
					time: time,
				},
			});

			await fan.save();
		}

		return NextResponse.json({ user: fan }, { status: 200 })

	} catch (error) {
		console.log('Error: ', error.message)
		return NextResponse.json(
			{ error: error.message }, { status: 500 }
		);
	}
}