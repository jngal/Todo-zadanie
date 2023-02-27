import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
  // list: { type: mongoose.Schema.Types.ObjectId, ref: 'List' },
});

export interface User extends mongoose.Document {
  id: string;
  name: string;
  email: string;
  password: string;
}
