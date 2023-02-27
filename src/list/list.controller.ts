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

import { ListService } from './list.service';

@Controller('lists')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get()
  async getAllLists() {
    const lists = await this.listService.getLists();
    return lists;
  }

  @Get(':listId')
  async getSingleList(@Param('listId') id: string) {
    const list = await this.listService.getList(id);
    return {
      id: list.id,
      title: list.title,
      tasks: list.tasks,
    };
  }

  @Post()
  async addList(
    @Body('title') listTitle: string,
    @Body('tasks') listTasks: object,
  ) {
    const generatedId = await this.listService.insertList({
      title: listTitle,
      tasks: listTasks,
    });
    return { id: generatedId };
  }

  @Patch(':id')
  async updateList(
    @Param('id') listId: string,
    @Body('title') listTitle: string,
    @Body('tasks') listTasks: object,
  ) {
    await this.listService.updateList(listId, listTitle, listTasks);
    return null;
  }

  @Delete(':id')
  async removeProduct(@Param('id') listId: string) {
    await this.listService.deleteList(listId);
    return null;
  }
}
