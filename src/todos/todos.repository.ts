import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { CreateTodoDto } from './dto/create-todo.dto';

import { Todo, TodoDocument } from './schema/todo.schema';

@Injectable()
export class TodosRepository {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  create(todo: CreateTodoDto): Observable<Todo> {
    return from(new this.todoModel(todo).save());
  }

  findAll(todosFilterQuery: FilterQuery<Todo>): Observable<Todo[] | Object> {
    return from(this.todoModel.find(todosFilterQuery));
  }

  async findOne(todosFilterQuery: FilterQuery<Todo>): Promise<Todo> {
    return this.todoModel.findOne(todosFilterQuery);
  }

  async update(
    todosFilterQuery: FilterQuery<Todo>,
    updateTodo: Partial<Todo>,
  ): Promise<Todo> {
    return this.todoModel.findOneAndUpdate(todosFilterQuery, updateTodo, {
      new: true,
    });
  }

  remove(todoFilterQuery: FilterQuery<Todo>): Observable<Todo> {
    return from(this.todoModel.findOneAndDelete(todoFilterQuery).exec());
  }
}
