import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { User } from '../user.entity';
import { ApiProperty, PickType } from '@nestjs/swagger';

export class CreateUserDTO extends PickType(User, [
  'firstName',
  'lastName',
  'email',
]) {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'test123#@',
    description: 'Provide the password of the user',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
