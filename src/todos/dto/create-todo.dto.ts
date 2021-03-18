import { IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Todo } from '../schema/todo.schema';
export class CreateTodoDto {
  @IsNotEmpty()
  readonly title: string;

  readonly desc: string;
}
