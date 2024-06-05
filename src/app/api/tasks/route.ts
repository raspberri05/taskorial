import { dbConnect } from "../db";
import { ObjectId } from "mongodb";
import { predictTime } from "../gemini";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const headersList = headers();
  const referer: string | null = headersList.get("Authorization");
  // @ts-expect-error
  const userId = referer.split(" ")[1];

  const db = await dbConnect();
  const formData = await request.formData();
  const time = await predictTime(formData.get("name"));
  const document = {
    name: formData.get("name"),
    userId: userId,
    completed: false,
    // @ts-expect-error
    time: time.response.candidates[0].content.parts[0].text,
    datetime: 0,
    priority: 0,
    description: "",
    createdAt: new Date(),
  };

  const result = await db.insertOne(document);
  // @ts-expect-error
  return Response.json(document);
}

export async function DELETE(request: NextRequest) {
  const headersList = headers();
  const referer: string | null = headersList.get("Authorization");
  // @ts-expect-error
  const userId = referer.split(" ")[1];

  const db = await dbConnect();
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("taskId");
  // @ts-expect-error
  const result = await db.deleteOne({ _id: new ObjectId(query) });
  // @ts-expect-error
  return Response.json({ deletedCount: result.deletedCount });
}

export async function GET(request: NextRequest) {
  const headersList = headers();
  const referer: string | null = headersList.get("Authorization");
  // @ts-expect-error
  const userId = referer.split(" ")[1];

  const db = await dbConnect();
  const result = await db.find({ userId: userId }).toArray();
  // @ts-expect-error
  return Response.json(result);
}

export async function PUT(request: NextRequest) {
  const headersList = headers();
  const referer: string | null = headersList.get("Authorization");
  // @ts-expect-error
  const userId = referer.split(" ")[1];

  const db = await dbConnect();
  const formData = await request.formData();
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("updateTask");
  const taskId = formData.get("taskId");
  const completion = formData.get("completion") === "true";
  // @ts-expect-error
  const filter = { _id: new ObjectId(taskId) };

  if (query === "true") {
    const update = { $set: { completed: completion } };
    const result = await db.updateOne(filter, update);

    // @ts-expect-error
    return Response.json({ modifiedCount: result.modifiedCount });
  }

  // @ts-expect-error
  return Response.json({});
}
