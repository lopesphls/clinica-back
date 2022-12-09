import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ISpeciality } from 'src/speciality/entities/speciality.entities';
import { CreateDoctorDto } from './create-doctor.dto';

export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {
  @ApiProperty()
  id: string;

  @ApiProperty()
  specialitys?: ISpeciality;

  @ApiProperty()
  deleted?: string[];
}
