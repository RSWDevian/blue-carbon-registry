import mongoose from "mongoose";

const MONGO_URI = "mongodb://localhost:27017/";

export const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) return;
  console.log("Connecting to MongoDB with URI:", MONGO_URI);
  return mongoose.connect(MONGO_URI);
};
