import { dbConnect } from "../db";
import { currentUser}  from "@clerk/nextjs/server";
import { type NextRequest } from 'next/server'
import { ObjectId } from "mongodb";
import { predictTime } from "../gemini";
import { getUserId } from "../user";

export async function POST(request: Request) {
  const db = await dbConnect();
  const formData = await request.formData()
  const time = await predictTime(formData.get('name'))
  const document = {
    name: formData.get('name'),
    userId: await getUserId(),
    completed: false,
    // @ts-ignore
    time: time.response.candidates[0].content.parts[0].text,
    datetime: 0,
    priority: 0,
    description: '',
    createdAt: new Date()
  };

  const result = await db.insertOne(document);
  // @ts-ignore
  return Response.json(document)
}

export async function DELETE(request: NextRequest) {
  const db = await dbConnect();
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('taskId')
  // @ts-ignore
  const result = await db.deleteOne({ _id: new ObjectId(query) })
  // @ts-ignore
  return Response.json({ deletedCount: result.deletedCount });
}

export async function GET() {
  const db = await dbConnect();
  const userId = await getUserId();
  const result = await db.find({ userId: userId }).toArray();
  // @ts-ignore
  return Response.json(result);
}

export async function PUT(request: NextRequest) {
  const db = await dbConnect();
  const formData = await request.formData()
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('updateTask')
  const taskId = formData.get('taskId')
  const completion = formData.get('completion') === "true"
  // @ts-ignore
  const filter = { _id: new ObjectId(taskId) };

  if (query === "true") {
    const update = { $set: { completed: completion} };
    const result = await db.updateOne(filter, update);

    // @ts-ignore
    return Response.json({ modifiedCount: result.modifiedCount });
  }

  // @ts-ignore
  return Response.json({});

}