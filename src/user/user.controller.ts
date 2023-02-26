import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';

// import { ApiProperty } from '@nestjs/swagger';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    const users = await this.userService.getUsers();
    return users;
  }

  @Get(':userId')
  async getSingleUser(@Param('userId') id: string) {
    const user = await this.userService.getUser(id);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    };
  }

  @Post()
  async addUser(
    @Body('name') userName: string,
    @Body('email') userEmail: string,
    @Body('password') userPassword: string,
  ) {
    const generatedId = await this.userService.insertUser({
      name: userName,
      email: userEmail,
      password: userPassword,
    });
    return { id: generatedId };
  }

  @Patch(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body('name') userName: string,
    @Body('email') userEmail: string,
    @Body('password') userPassword: string,
  ) {
    await this.userService.updateUser(
      userId,
      userName,
      userEmail,
      userPassword,
    );
    return null;
  }

  @Delete(':id')
  async removeProduct(@Param('id') userId: string) {
    await this.userService.deleteUser(userId);
    return null;
  }
}
