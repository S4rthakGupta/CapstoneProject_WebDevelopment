import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

console.log("🔍 MONGODB_URI from env:", MONGODB_URI); // Debugging

if (!MONGODB_URI) {
  throw new Error("🚨 Please define the MONGODB_URI environment variable inside .env.local");
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

console.log("Testing MongoDB"); // Debugging
