// Code for connecting to mongodb

// import mongoose from "mongoose";

// const connectMongoDB = async () => {
//   try {
//     if (!process.env.MONGODB_URI) {
//       throw new Error("MONGO_URI is not defined");
//     }
//     await mongoose.connect(process.env.MONGODB_URI);
//     console.log("MongoDB Connected");
//   } catch (error) {
//     console.log("MongoDB Connection Failed", error);
//   }
// };

// export default connectMongoDB;
// MongoDB connection utility

import { MongoClient } from 'mongodb';
import { Db } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || '';
const MONGODB_DB = process.env.MONGODB_DB || '';

let cachedClient: MongoClient | null = null;


let cachedDb: Db | null = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(MONGODB_DB);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}