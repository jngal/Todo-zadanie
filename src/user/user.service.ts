import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './user.model';

@Injectable()
export class UserService {
  private users: User[] = [];

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getUsers() {
    const users = await this.userModel.find().exec();
    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    }));
  }

  async getUser(userId: string) {
    const user = await this.findUser(userId);
    return user;
  }
  private async findUser(id: string): Promise<User> {
    let user;
    try {
      user = await this.userModel.findById(id);
    } catch (error) {
      throw new NotFoundException(`Could not find user with id: ${id}`);
    }
    if (!user) {
      throw new NotFoundException(`Could not find user with id: ${id}`);
    }
    return user;
  }

  async insertUser({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) {
    const newUser = new this.userModel({
      name: name,
      email: email,
      password: password,
    });
    const result = await newUser.save();
    return result.id as string;
  }

  async updateUser(
    userId: string,
    name: string,
    email: string,
    password: string,
  ) {
    const updatedUser = await this.findUser(userId);
    if (name) {
      updatedUser.name = name;
    }
    if (email) {
      updatedUser.email = email;
    }
    if (password) {
      updatedUser.password = password;
    }
    updatedUser.save();
  }

  async deleteUser(userId: string) {
    const result = await this.userModel.deleteOne({ _id: userId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Could not find user with id: ${userId}`);
    }
  }
}
