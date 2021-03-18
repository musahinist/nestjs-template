import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './schema/todo.schema';
import { TodosRepository } from './todos.repository';

@Injectable()
export class TodosService {
  constructor(private readonly todosRepo: TodosRepository) {}
  create(createTodoDto: CreateTodoDto): Observable<Todo> {
    return this.todosRepo.create(createTodoDto);
  }

  findAll(): Observable<Todo[]> | Object {
    return this.todosRepo.findAll({});
  }

  findOne(id: string): Observable<Todo[]> | Object {
    return this.todosRepo.findOne({ _id: id });
  }

  update(
    id: string,
    updateTodoDto: UpdateTodoDto,
  ): Observable<Todo[]> | Object {
    return this.todosRepo.update({ _id: id }, updateTodoDto);
  }

  remove(id: string): Observable<Todo> {
    return this.todosRepo.remove({ _id: id });
  }
}
