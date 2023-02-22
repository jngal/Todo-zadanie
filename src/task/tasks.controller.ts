import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTasks() {
    const tasks = await this.taskService.getTasks();
    return tasks;
  }

  @Get(':taskId')
  async getSingleTask(@Param('taskId') id: string) {
    const task = await this.taskService.getTask(id);
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      isComplete: task.isComplete,
      userId: task.userId,
      created: task.created,
      deadline: task.deadline,
    };
  }

  @Post()
  async addTask(
    @Body('title') taskTitle: string,
    @Body('description') taskDescription: string,
    @Body('isComplete') taskIsComplete: boolean,
    @Body('userId') taskUserId: string,
    @Body('created') taskCreated: Date,
    @Body('deadline') taskDeadline: Date,
  ) {
    const generatedId = await this.taskService.insertTask({
      title: taskTitle,
      description: taskDescription,
      isComplete: taskIsComplete,
      userId: taskUserId,
      created: taskCreated,
      deadline: taskDeadline,
    });
    return { id: generatedId };
  }

  @Patch(':id')
  async updateTask(
    @Param('id') taskId: string,
    @Body('title') taskTitle: string,
    @Body('description') taskDesc: string,
    @Body('isComplete') taskIsComplete: boolean,
    @Body('userId') taskUserId: string,
    @Body('created') taskCreated: Date,
    @Body('deadline') taskDeadline: Date,
  ) {
    await this.taskService.updateTask(
      taskId,
      taskTitle,
      taskDesc,
      taskIsComplete,
      taskUserId,
      taskCreated,
      taskDeadline,
    );
    return null;
  }

  @Delete(':id')
  async removeProduct(@Param('id') taskId: string) {
    await this.taskService.deleteTask(taskId);
    return null;
  }
}
