import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from 'src/auth/dto/create-task.dto';
import { UpdateTaskDto } from 'src/auth/dto/update-task.dto';

import { Task } from './task.model';

@Injectable()
export class TaskService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async getTasks(): Promise<Task[]> {
    const taskData = await this.taskModel.find();
    if (!taskData || taskData.length == 0) {
      throw new NotFoundException('Task data not found');
    }
    return taskData;
  }

  async getTask(taskId: string): Promise<Task> {
    const task = await this.taskModel.findById(taskId);
    if (!task) {
      throw new NotFoundException(`Could not find Task with id: ${taskId}`);
    }
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = await new this.taskModel(createTaskDto);
    return newTask.save();
  }

  async updateTask(
    taskId: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const existingTask = await this.taskModel.findByIdAndUpdate(
      taskId,
      updateTaskDto,
      { new: true },
    );
    if (!existingTask) {
      throw new NotFoundException(
        `Could not find task with id: ${taskId} and Update it.`,
      );
    }
    return existingTask;
  }

  async deleteTask(taskId: string): Promise<Task> {
    const deleteTask = await this.taskModel.findByIdAndDelete(taskId);
    if (!deleteTask) {
      throw new NotFoundException(
        `Could not find task with id: ${taskId} and delete it.`,
      );
    }
    return deleteTask;
  }
}
