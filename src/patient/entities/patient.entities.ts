import { CreatePatientDto } from '../dto/create-patient.dto';

export interface IPatientEntities extends CreatePatientDto {
  id: string;
}
