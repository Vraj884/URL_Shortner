// lib/mongoose.js
import mongoose from 'mongoose';

const MONGODB_URI = process.env.URI;

if (!MONGODB_URI) {
  throw new Error('⚠️ Please define MONGODB_URI in your .env.local');
}

// Global connection cache (prevents multiple connections in dev)
let isConnected = false;

export async function connectDB() {
  if (isConnected) {
    console.log('✅ MongoDB already connected');
    return;
  }

  try {
    const db = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'urlshortener', // optional: use your own DB name
    });

    isConnected = true;
    console.log(`✅ MongoDB connected to: ${db.connection.name}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}
