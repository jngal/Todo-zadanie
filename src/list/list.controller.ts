import {
  Controller,
  Get,
  Post,
  Put,
  Res,
  HttpStatus,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CreateListDto } from 'src/auth/dto/create-list.dto';
import { UpdateListDto } from 'src/auth/dto/update-list.dto';
import { JwtAuthGuard } from 'src/utils/guards/jwt-guard.guard';

// import { ApiProperty } from '@nestjs/swagger';

import { ListService } from './list.service';

@Controller('lists')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllLists(@Res() response) {
    try {
      const listData = await this.listService.getLists();
      return response.status(HttpStatus.OK).json({
        message: 'All list data found successfully',
        listData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getSingleList(@Res() response, @Param('id') listId: string) {
    try {
      const existingList = await this.listService.getList(listId);
      return response.status(HttpStatus.OK).json({
        message: 'List found successfully',
        existingList,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createList(@Res() response, @Body() createListDto: CreateListDto) {
    try {
      const newList = await this.listService.createList(createListDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'List has been created successfully',
        newList,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error List not created',
        error: 'Bad request',
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async updateList(
    @Res() response,
    @Param('id') listId: string,
    @Body() updateListDto: UpdateListDto,
  ) {
    try {
      const existingList = await this.listService.updateList(
        listId,
        updateListDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'List has been successfully updated',
        existingList,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteList(@Res() response, @Param('id') listId: string) {
    try {
      const deletedList = await this.listService.deleteList(listId);

      return response.status(HttpStatus.OK).json({
        message: 'List Deleted Successfully',
        deletedList,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
