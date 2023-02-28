import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { List } from './list.model';
import { CreateListDto } from 'src/auth/dto/create-list.dto';
import { UpdateListDto } from 'src/auth/dto/update-list.dto';

@Injectable()
export class ListService {
  constructor(@InjectModel('List') private readonly listModel: Model<List>) {}

  async getLists(): Promise<List[]> {
    const listData = await this.listModel
      .find()
      .populate('tasks')
      .populate('user');
    if (!listData || listData.length == 0) {
      throw new NotFoundException('List data not found');
    }
    return listData;
  }

  async getList(listId: string): Promise<List> {
    const list = (
      await (await this.listModel.findById(listId)).populate('tasks')
    ).populate('user', 'name');
    if (!list) {
      throw new NotFoundException(`Could not find list with id: ${listId}`);
    }
    return list;
  }

  async createList(createListDto: CreateListDto): Promise<List> {
    const newList = await new this.listModel(createListDto);
    return newList.save();
  }

  async updateList(
    listId: string,
    updateListDto: UpdateListDto,
  ): Promise<List> {
    const existingList = await this.listModel.findByIdAndUpdate(
      listId,
      updateListDto,
      { new: true },
    );
    if (!existingList) {
      throw new NotFoundException(
        `Could not find list with id: ${listId} and Update it.`,
      );
    }
    return existingList;
  }

  async deleteList(listId: string): Promise<List> {
    const deleteList = await this.listModel.findByIdAndDelete(listId);
    if (!deleteList) {
      throw new NotFoundException(
        `Could not find list with id: ${listId} and delete it.`,
      );
    }
    return deleteList;
  }
}
