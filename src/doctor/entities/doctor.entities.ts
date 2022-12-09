import { CreateDoctorDto } from '../dto/create-doctor.dto';

export interface IDoctorEntities extends CreateDoctorDto {
  id: string;
  CRM: number;
}
