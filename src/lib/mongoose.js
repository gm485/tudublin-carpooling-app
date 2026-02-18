import mongoose from "mongoose";

const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_HOST, MONGODB_DB } = process.env;

// Encode password to handle special characters like '@'
const MONGODB_URI = `mongodb+srv://${MONGODB_USER}:${encodeURIComponent(MONGODB_PASSWORD)}@${MONGODB_HOST}/${MONGODB_DB}?retryWrites=true&w=majority`;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
}

// Cache the connection to prevent multiple connections in development
let cached = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null, promise: null };

export async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI).then((mongooseInstance) => {
            console.log("Connected to MongoDB");
            return mongooseInstance;
        }).catch((err) => {
            console.error("Error connecting to MongoDB:", err);
            throw err;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}
