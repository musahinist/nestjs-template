import { PartialType } from '@nestjs/mapped-types';
import { User } from '../schema/user.schema';

export class CreateUserDto {
  email: string;
  age: number;
  createdAt: Date;
}
