import { IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
  readonly title: string;
  @IsNotEmpty()
  readonly desc: string;
}
