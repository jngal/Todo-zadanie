import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { List } from './list.model';
import { TaskModel } from 'src/task/task.model';
import { ListModule } from './list.module';
import { CreateListDto } from 'src/auth/dto/create-list.dto';
import { UpdateListDto } from 'src/auth/dto/update-list.dto';

@Injectable()
export class ListService {
  //   private lists: List[] = [];

  constructor(@InjectModel('List') private readonly listModel: Model<List>) {}

  async getLists(): Promise<List[]> {
    const listData = await this.listModel.find().populate('');
    if (!listData || listData.length == 0) {
      throw new NotFoundException('List data not found');
    }
    return listData;
  }

  async getList(listId: string): Promise<List> {
    const list = await this.listModel.findById(listId);
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

  //   private async findList(id: string): Promise<List> {
  //     let list;
  //     try {
  //       list = await this.listModel.findById(id);
  //     } catch (error) {
  //       throw new NotFoundException(`Could not find list with id: ${id}`);
  //     }
  //     if (!list) {
  //       throw new NotFoundException(`Could not find list with id: ${id}`);
  //     }
  //     return list;
  //   }

  //   async insertList({ title, tasks }: { title: string; tasks: object }) {
  //     const newList = new this.listModel({
  //       title: title,
  //       tasks: tasks,
  //     });
  //     const result = await newList.save();
  //     return result.id as string;
  //   }

  //   async updateList(listId: string, title: string, tasks: object) {
  //     const updatedList = await this.findList(listId);
  //     if (title) {
  //       updatedList.title = title;
  //     }
  //     if (tasks) {
  //       updatedList.tasks = { tasks };
  //     }
  //     updatedList.save();
  //   }

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
