import { ApiProperty } from '@nestjs/swagger';

export class CreateDoctorDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  specialitys?: { id: string; name: string };
}
