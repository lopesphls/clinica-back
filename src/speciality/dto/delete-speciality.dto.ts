import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeleteSpecialityDto {
  @ApiProperty()
  @IsString()
  name: string[];
}
