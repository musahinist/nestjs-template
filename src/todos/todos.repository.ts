import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';

import { Todo, TodoDocument } from './schema/todo.schema';

@Injectable()
export class TodosRepository {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async create(todo: CreateTodoDto): Promise<Todo> {
    return new this.todoModel(todo).save();
  }

  async findAll(todosFilterQuery: FilterQuery<Todo>): Promise<Todo[]> {
    return this.todoModel.find(todosFilterQuery);
  }

  async findOne(todosFilterQuery: FilterQuery<Todo>): Promise<Todo> {
    return this.todoModel.findOne(todosFilterQuery);
  }

  async update(
    todosFilterQuery: FilterQuery<Todo>,
    updateTodo: Partial<Todo>,
  ): Promise<Todo> {
    return this.todoModel.findOneAndUpdate(todosFilterQuery, updateTodo);
  }

  async remove(todosFilterQuery: FilterQuery<Todo>): Promise<Todo> {
    return this.todoModel.findOneAndDelete(todosFilterQuery);
  }
}
