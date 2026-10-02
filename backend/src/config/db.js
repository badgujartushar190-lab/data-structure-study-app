import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/dsaforge');
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`[Database] Connection Warning: ${error.message}`);
    console.warn(`[Database] Running in fallback mode without active DB connection.`);
    return false;
  }
};
