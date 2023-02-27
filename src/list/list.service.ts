import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { List } from './list.model';

@Injectable()
export class ListService {
  private lists: List[] = [];

  constructor(@InjectModel('List') private readonly listModel: Model<List>) {}

  async getLists() {
    const lists = await this.listModel.find().exec();
    return lists.map((list) => ({
      id: list.id,
      title: list.title,
      tasks: list.tasks,
    }));
  }

  async getList(listId: string) {
    const list = await (await this.findList(listId)).populate('tasks');
    return list;
  }
  private async findList(id: string): Promise<List> {
    let list;
    try {
      list = await this.listModel.findById(id);
    } catch (error) {
      throw new NotFoundException(`Could not find list with id: ${id}`);
    }
    if (!list) {
      throw new NotFoundException(`Could not find list with id: ${id}`);
    }
    return list;
  }

  async insertList({ title, tasks }: { title: string; tasks: object }) {
    const newList = new this.listModel({
      title: title,
      tasks: tasks,
    });
    const result = await newList.save();
    return result.id as string;
  }

  async updateList(listId: string, title: string, tasks: object) {
    const updatedList = await this.findList(listId);
    if (title) {
      updatedList.title = title;
    }
    if (tasks) {
      updatedList.tasks = { tasks };
    }
    updatedList.save();
  }

  async deleteList(listId: string) {
    const result = await this.listModel.deleteOne({ _id: listId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Could not find list with id: ${listId}`);
    }
  }
}
