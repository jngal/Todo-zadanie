import * as mongoose from 'mongoose';
import { List } from 'src/list/list.model';

export const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  flag: { type: String, required: true },
  created: { type: Date, required: false },
  deadline: { type: Date, required: false },
  list: { type: mongoose.Schema.Types.ObjectId, ref: 'List' },
});

export const TaskModel = mongoose.model('Task', TaskSchema);

export interface Task extends mongoose.Document {
  id: string;
  title: string;
  description: string;
  flag: string;
  created: Date;
  deadline: Date;
  list: List;
}
