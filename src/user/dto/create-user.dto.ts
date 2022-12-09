import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @Length(6)
  @IsEmpty()
  password: string;
}
