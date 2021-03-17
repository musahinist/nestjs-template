import { PartialType } from '@nestjs/mapped-types';
import { User } from '../schema/user.schema';

export class CreateUserDto {
  readonly email: string;
  readonly age: number;
  readonly createdAt: Date;
}
