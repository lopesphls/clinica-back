import { Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';
import { DoctorRepository } from './doctor.repository';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { IDoctorEntities } from './entities/doctor.entities';

@Injectable()
export class DoctorService {
  constructor(private readonly doctorRepository: DoctorRepository) {}

  public async allDoctors() {
    return await this.doctorRepository.getAll();
  }

  public async doctorId(id: string) {
    return await this.doctorRepository.getById(id);
  }

  public async createDoctor({
    name,
    specialitys,
  }: CreateDoctorDto): Promise<IDoctorEntities> {
    const doctor: IDoctorEntities = {
      id: `d-${randomInt(100, 1000)}`,
      CRM: randomInt(1000000, 10000000),
      name,
      specialitys: { id: specialitys.id, name: specialitys.name },
    };

    return doctor;
  }

  public async updatedDoctor({
    id,
    specialitys,
    name,
    deleted,
  }: UpdateDoctorDto) {
    try {
      let speciality;
      const doc = await this.doctorId(id);

      if (specialitys.name === '' && doc.specialitys.length === 0) {
        speciality = { id: `s-${randomInt(100, 1000)}`, name: 'Clinico geral' };
      } else {
        speciality = {
          id: `s-${randomInt(100, 1000)}`,
          name: specialitys.name,
        };
      }

      const doctor = {
        id,
        name,
        deleted,
        specialitys: speciality,
      };
      console.log(doctor);

      if (doc.id === undefined) {
        return 'usuário não encontrado';
      } else {
        return await this.doctorRepository.updateDoctor(doctor);
      }
    } catch (error) {
      return error;
    }
  }

  public async deleteDoctor(doctor: IDoctorEntities) {
    try {
      return await this.doctorRepository.deleteDoctor(doctor);
    } catch (error) {
      return error;
    }
  }
}
