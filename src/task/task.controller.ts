import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Res,
  Param,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CreateTaskDto } from 'src/auth/dto/create-task.dto';
import { UpdateTaskDto } from 'src/auth/dto/update-task.dto';
import { JwtAuthGuard } from 'src/utils/guards/jwt-guard.guard';

// import { ApiProperty,  } from '@nestjs/swagger';

import { TaskService } from './task.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllTasks(@Res() response) {
    try {
      const tasks = await this.taskService.getTasks();
      return response.status(HttpStatus.OK).json({
        message: 'All Tasks data found successfully',
        tasks,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':taskId')
  async getSingleTask(@Res() response, @Param('taskId') id: string) {
    try {
      const task = await this.taskService.getTask(id);
      return response.status(HttpStatus.OK).json({
        message: 'Task found successfully',
        task,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTask(@Res() response, @Body() createTaskDto: CreateTaskDto) {
    try {
      const newTask = await this.taskService.createTask(createTaskDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Task has been created successfully',
        newTask,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error Task not created',
        error: 'Bad request',
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async updateTask(
    @Res() response,
    @Param('id') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    try {
      const existingTask = await this.taskService.updateTask(
        taskId,
        updateTaskDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Task has been successfully updated',
        existingTask,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteTask(@Res() response, @Param('id') taskId: string) {
    try {
      const deletedTask = await this.taskService.deleteTask(taskId);

      return response.status(HttpStatus.OK).json({
        message: 'Task Deleted Successfully',
        deletedTask,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
