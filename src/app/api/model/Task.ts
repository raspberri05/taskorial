import mongoose, { Schema, Document, Model } from "mongoose";

interface ITask extends Document {
  name: string;
  userId: string;
  completed: boolean;
  time: string;
  datetime: string;
  priority: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  datetime: {
    type: String,
    required: true,
  },
  priority: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

const Task: Model<ITask> =
  mongoose.models.Task || mongoose.model<ITask>("Task", taskSchema);
export default Task;
