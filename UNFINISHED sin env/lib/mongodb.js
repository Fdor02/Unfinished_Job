import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI;
let client;
let clientPromise;

if (!client) {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    clientPromise = client.connect();
}

export async function connectToDatabase() {
    await clientPromise;
    const db = client.db(); // Utiliza la base de datos especificada en MONGO_URI
    return { db };
}
