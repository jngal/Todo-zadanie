import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';

// import { ApiProperty,  } from '@nestjs/swagger';

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
      flag: task.flag,
      created: task.created,
      deadline: task.deadline,
    };
  }

  @Post()
  async addTask(
    @Body('title') taskTitle: string,
    @Body('description') taskDescription: string,
    @Body('flag') taskFlag: string,
    @Body('created') taskCreated: Date,
    @Body('deadline') taskDeadline: Date,
  ) {
    const generatedId = await this.taskService.insertTask({
      title: taskTitle,
      description: taskDescription,
      flag: taskFlag,
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
    @Body('flag') taskFlag: string,
    @Body('created') taskCreated: Date,
    @Body('deadline') taskDeadline: Date,
  ) {
    await this.taskService.updateTask(
      taskId,
      taskTitle,
      taskDesc,
      taskFlag,
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
