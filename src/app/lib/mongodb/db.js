import { MongoClient } from 'mongodb';

const DB_USERNAME= process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

const MONGODB_URI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.yjoup.gcp.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;
// const MONGODB_URI = "mongodb://localhost:27017/";

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
        client = new MongoClient(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        global._mongoClientPromise = client.connect();
    }

    clientPromise = global._mongoClientPromise;
}
else {
    client = new MongoClient(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    clientPromise = client.connect();
}

export default clientPromise;