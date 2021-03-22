import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { User } from 'src/users/schema/user.schema';

export class LogInUserDto extends PartialType(User) {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(8)
  @MinLength(6)
  readonly password: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail({}, { message: 'email must be valid' })
  readonly email: string;
}
