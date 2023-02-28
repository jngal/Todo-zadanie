import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { UpdateUserDto } from 'src/auth/dto/update-user.dto';

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
  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async insertUser(createUserDto: CreateUserDto): Promise<User> {
    const newTask = await new this.userModel(createUserDto);
    return newTask.save();
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const existingUser = await this.userModel.findByIdAndUpdate(
      userId,
      updateUserDto,
      { new: true },
    );
    if (!existingUser) {
      throw new NotFoundException(
        `Could not find list with id: ${userId} and Update it.`,
      );
    }
    return existingUser;
  }

  async deleteUser(userId: string) {
    const result = await this.userModel.deleteOne({ _id: userId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Could not find user with id: ${userId}`);
    }
  }
}
