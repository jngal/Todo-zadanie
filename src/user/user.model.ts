import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export interface User extends mongoose.Document {
  id: string;
  name: string;
  email: string;
  password: string;
}
