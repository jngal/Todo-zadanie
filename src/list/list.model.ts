import * as mongoose from 'mongoose';

export const ListSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
});

export const ListModel = mongoose.model('List', ListSchema);

export interface List extends mongoose.Document {
  id: string;
  title: string;
  tasks: object;
}
