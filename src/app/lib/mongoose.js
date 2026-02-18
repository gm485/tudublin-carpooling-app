import mongoose from 'mongoose';
const {MONGODB_USER, MONGODB_PASSWORD, MONGODB_DB, MONGODB_HOST } = process.env;


const MONGODB_URI = `mongodb+srv://${MONGODB_USER}:${encodeURIComponent(MONGODB_PASSWORD)}@${MONGODB_HOST}/${MONGODB_DB}?retryWrites=true&w=majority`;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

export async function connectToDatabase() {
    if(mongoose.connection.readyState >= 1) {
        return
    }

    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to database');

    } catch (err){
        console.error('Error connecting to database:', err);
    }
}