import mongoose from "mongoose";

// const MONGO_URI = "mongodb://localhost:27017/";
const MONGO_URI = "mongodb+srv://abhirupguharoy_db_user:vRZ16t0wWlKi5Kmq@userstorage.hfiuk62.mongodb.net/"

export const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) return;
  console.log("Connecting to MongoDB with URI:", MONGO_URI);
  return mongoose.connect(MONGO_URI);
};
