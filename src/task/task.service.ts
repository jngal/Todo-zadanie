import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Task } from './task.model';

@Injectable()
export class TaskService {
  private tasks: Task[] = [];

  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async getTasks() {
    const tasks = await this.taskModel.find().exec();
    return tasks.map((task) => ({
      id: task.id,
      title: task.title,
      description: task.description,
      isComplete: task.isComplete,
      userId: task.userId,
      created: task.created,
      deadline: task.deadline,
    }));
  }

  async getTask(taskId: string) {
    const task = await this.findTask(taskId);
    return task;
  }
  private async findTask(id: string): Promise<Task> {
    let task;
    try {
      task = await this.taskModel.findById(id);
    } catch (error) {
      throw new NotFoundException(`Could not find task with id: ${id}`);
    }
    if (!task) {
      throw new NotFoundException(`Could not find task with id: ${id}`);
    }
    return task;
  }

  async insertTask({
    title,
    description,
    isComplete,
    userId,
    created,
    deadline,
  }: {
    title: string;
    description: string;
    isComplete: boolean;
    userId: string;
    created: Date;
    deadline: Date;
  }) {
    const newTask = new this.taskModel({
      title: title,
      description: description,
      isComplete: isComplete,
      userId: userId,
      created: created,
      deadline: deadline,
    });
    const result = await newTask.save();
    return result.id as string;
  }

  async updateTask(
    taskId: string,
    title: string,
    description: string,
    isComplete: boolean,
    userId: string,
    created: Date,
    deadline: Date,
  ) {
    const updatedTask = await this.findTask(taskId);
    if (title) {
      updatedTask.title = title;
    }
    if (description) {
      updatedTask.description = description;
    }
    if (isComplete) {
      updatedTask.isComplete = isComplete;
    }
    if (userId) {
      updatedTask.userId = userId;
    }
    if (created) {
      updatedTask.created = created;
    }
    if (deadline) {
      updatedTask.deadline = deadline;
    }
    updatedTask.save();
  }

  async deleteTask(taskId: string) {
    const result = await this.taskModel.deleteOne({ _id: taskId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Could not find task with id: ${taskId}`);
    }
  }
}
