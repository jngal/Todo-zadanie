import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  isComplete: { type: Boolean, required: true },
  userId: { type: String, required: false },
  created: { type: Date, required: false },
  deadline: { type: Date, required: false },
});

export interface Task extends mongoose.Document {
  id: string;
  title: string;
  description: string;
  isComplete: boolean;
  userId: string;
  created: Date;
  deadline: Date;
}
