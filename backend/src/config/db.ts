import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    console.log("before connecting");

    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connected to the database successfully!");
  } catch (err) {
    console.log("error connecting db", err);
  }
};
