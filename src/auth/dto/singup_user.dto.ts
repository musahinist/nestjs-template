import { PartialType } from '@nestjs/mapped-types';

import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { User } from 'src/users/schema/user.schema';
export class SignUpUserDto extends PartialType(User) {
  @IsNotEmpty()
  @MaxLength(16)
  readonly name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'email must be valid' })
  readonly email: string;

  @IsNotEmpty()
  @MaxLength(8)
  @MinLength(6)
  password: string;
}
