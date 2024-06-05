// db.ts
import { MongoClient, Collection } from "mongodb";

let collection: Collection;

export async function dbConnect() {
  if (!collection) {
    // @ts-ignore
    const client = new MongoClient(process.env.DB_URL);
    await client.connect();
    const db = client.db("tasks");
    collection = db.collection("tasks");
  }
  return collection;
}
