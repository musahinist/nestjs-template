import { PartialType } from '@nestjs/mapped-types';
import { User } from '../schema/user.schema';
import { isArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class CreateUserDto extends PartialType(User) {
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  @IsEmail({}, { message: 'email must be valid' })
  readonly email: string;
  @IsNotEmpty()
  readonly age: number;
  @IsNotEmpty()
  @IsString({ each: true })
  readonly favorites: string[];
}
