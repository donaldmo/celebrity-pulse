import { connectMongo } from "../../../lib/mongodb";
import User from '../../../lib/mongodb/schema/users';
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

		let user = await User.findOne({ email });

		if (user) {
			user.login = {
				expires: login.expires,
				time: time,
			};

			await user.save();

			return NextResponse.json({ message: 'User login updated', user }, { status: 200 });
		}

		if (!user) {
			const newUser = new User({
				name,
				email,
				image,
				login: {
					expires: login.expires,
					time: time,
				},
			});

			await newUser.save();

			return NextResponse.json({
				message: 'New user created',
				user: newUser
			}, { status: 201 });
		}

	} catch (error) {
		console.error('Error in /api/auth/login:', error);

		return NextResponse.json({ 
			message: 'Internal Server Error' 
		},{ status: 500 });
	}
}