import * as mongoose from 'mongoose';
import { List } from 'src/list/list.model';

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
  lists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }],
});

export const UserModel = mongoose.model('User', UserSchema);

export interface User extends mongoose.Document {
  id: string;
  name: string;
  email: string;
  password: string;
  lists: List;
}
