import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateDoctorDto } from './create-doctor.dto';

export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {
  @ApiProperty()
  id: string;

  @ApiProperty()
  deleted?: string[];
}
