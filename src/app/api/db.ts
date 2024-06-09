import mongoose from "mongoose";

export async function dbConnect() {
  // @ts-ignore
  await mongoose.connect(process.env.DB_URL);
}
