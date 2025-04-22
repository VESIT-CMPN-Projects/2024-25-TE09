import mongoose from "mongoose";

const connectDB = async (mongo_url) => {
  try {
    await mongoose.connect(mongo_url);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
    process.exit(1);
  }
};
export default connectDB;
