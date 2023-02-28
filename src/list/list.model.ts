import * as mongoose from 'mongoose';
import { Task } from 'src/task/task.model';
import { User } from 'src/user/user.model';

export const ListSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export const ListModel = mongoose.model('List', ListSchema);

export interface List extends mongoose.Document {
  id: string;
  title: string;
  tasks: Task;
  user: User;
}
