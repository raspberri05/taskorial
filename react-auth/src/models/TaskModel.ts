export interface TaskModel {
  _id: string;
  name: string;
  completed?: boolean;
  userId?: string;
  time?: number;
}
