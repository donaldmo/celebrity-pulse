import mongoose from 'mongoose';

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

const MONGODB_URI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.yjoup.gcp.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;
let isConnected = false;

export async function connectMongo() {
	if (isConnected) {
		console.log("Using existing MongoDB connection");
		return;
	}

	try {
		await mongoose.connect(MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		isConnected = true; 
		console.log("Connected to MongoDB");
	} catch (error) {
		console.error("Error connecting to MongoDB", error);
		throw new Error("MongoDB connection failed");
	}
}
