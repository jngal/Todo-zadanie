import {
  Controller,
  Get,
  Post,
  Put,
  Res,
  Delete,
  Body,
  Param,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { UpdateListDto } from 'src/auth/dto/update-list.dto';
import { UpdateUserDto } from 'src/auth/dto/update-user.dto';
import { JwtAuthGuard } from 'src/utils/guards/jwt-guard.guard';

// import { ApiProperty } from '@nestjs/swagger';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers(@Res() response) {
    try {
      const users = await this.userService.getUsers();
      return response.status(HttpStatus.OK).json({
        message: 'All Users data found successfully',
        users,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async getSingleUser(@Res() response, @Param('userId') id: string) {
    try {
      const user = await this.userService.getUser(id);
      return response.status(HttpStatus.OK).json({
        message: 'User found successfully',
        user,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Post()
  async addUser(@Res() response, @Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.userService.insertUser(createUserDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'User has been created successfully',
        newUser,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error User not created',
        error: 'Bad request',
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async updateUser(
    @Res() response,
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const existingUser = await this.userService.updateUser(
        userId,
        updateUserDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'User has been successfully updated',
        existingUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeProduct(@Param('id') userId: string) {
    await this.userService.deleteUser(userId);
    return null;
  }
}
