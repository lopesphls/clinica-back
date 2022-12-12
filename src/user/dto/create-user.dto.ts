import { ApiProperty } from '@nestjs/swagger';
import { IDoctorEntities } from 'src/doctor/entities/doctor.entities';
import { IPatientEntities } from 'src/patient/entities/patient.entities';

export class CreateUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  doctor?: IDoctorEntities;

  @ApiProperty()
  patient?: IPatientEntities;
}
