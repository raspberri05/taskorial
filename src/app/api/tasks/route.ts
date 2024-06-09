import { dbConnect } from "../db";
import mongoose from "mongoose";
import { predictTime } from "../gemini";
import { headers } from "next/headers";
import { NextRequest } from "next/server";
import Task from "../model/Task";

export async function POST(request: NextRequest) {
  const headersList = headers();
  const referer: string | null = headersList.get("Authorization");
  // @ts-expect-error
  const userId = referer.split(" ")[1];

  const db = await dbConnect();
  const formData = await request.formData();
  const time = await predictTime(formData.get("name"));
  const document = new Task({
    name: formData.get("name"),
    userId: userId,
    completed: false,
    // @ts-expect-error
    time: time.response.candidates[0].content.parts[0].text,
    datetime: new Date(),
    priority: 0,
    description: "description",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const result = await document.save();
  return Response.json(document);
}

export async function DELETE(request: NextRequest) {
  const db = await dbConnect();
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("taskId");
  const result = await Task.deleteOne({
    // @ts-expect-error
    _id: new mongoose.Types.ObjectId(query),
  });
  return Response.json({ deletedCount: result.deletedCount });
}

export async function GET() {
  const headersList = headers();
  const referer: string | null = headersList.get("Authorization");
  // @ts-expect-error
  const userId = referer.split(" ")[1];

  const db = await dbConnect();
  const result = await Task.find({ userId: userId });
  return Response.json(result);
}

export async function PUT(request: NextRequest) {
  const db = await dbConnect();
  const formData = await request.formData();
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("updateTask");
  const taskId = formData.get("taskId");
  const completion = formData.get("completion") === "true";
  // @ts-expect-error
  const filter = { _id: new mongoose.Types.ObjectId(taskId) };

  if (query === "true") {
    const update = { $set: { completed: completion, updatedAt: new Date() } };
    const result = await Task.updateOne(filter, update);

    return Response.json({ modifiedCount: result.modifiedCount });
  }

  return Response.json({});
}
