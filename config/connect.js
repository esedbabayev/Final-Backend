import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;

export const connectToDb = async () => {
  try {
    await mongoose.connect(MONGODB_URL, {});
    console.log("Database connection established");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
};
