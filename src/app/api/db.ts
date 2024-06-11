import mongoose from "mongoose";

export async function dbConnect() {
  // @ts-expect-error
  await mongoose.connect(process.env.DB_URL);
}
