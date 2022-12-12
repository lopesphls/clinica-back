/* eslint-disable no-unreachable */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { randomInt, randomUUID } from 'crypto';
import { DoctorService } from 'src/doctor/doctor.service';
import { CreateDoctorDto } from 'src/doctor/dto/create-doctor.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserEntities } from './entities/user.entities';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly doctorService: DoctorService,
  ) {}

  public async allUsers() {
    try {
      return await this.userRepository.getData();
    } catch (error) {
      return error;
    }
  }

  public async userId(id: IUserEntities) {
    try {
      return await this.userRepository.getDataById(id);
    } catch (error) {
      return error;
    }
  }

  public async createdPatient({ email, password, patient }: CreateUserDto) {
    try {
      const user: IUserEntities = {
        id: randomUUID(),
        email,
        password,
        role: Role.PATIENT,
        patient: {
          id: `p-${randomInt(100, 1000)}`,
          CPF: patient.CPF,
          name: patient.name,
        },
      };
      return await this.userRepository.createInDb(user);
    } catch (error) {
      return error;
    }
  }

  public async createdDoctor({ email, password, doctor }: CreateUserDto) {
    try {
      let speciality;

      if (doctor.specialitys.name === '') {
        speciality = { id: `s-${randomInt(100, 1000)}`, name: 'Clinico geral' };
      } else {
        speciality = {
          id: `s-${randomInt(100, 1000)}`,
          name: doctor.specialitys.name,
        };
      }
      const Doctor: CreateDoctorDto = {
        name: doctor.name,
        specialitys: speciality,
      };

      const CreateDoctor = await this.doctorService.createDoctor(Doctor);

      const user: IUserEntities = {
        id: randomUUID(),
        email,
        password,
        role: Role.DOCTOR,
        doctor: CreateDoctor,
      };

      return await this.userRepository.createInDb(user);
    } catch (error) {
      return error;
    }
  }

  public async updatedUser({ id, email, password }: UpdateUserDto) {
    try {
      return await this.userRepository.editUser({ id, email, password });
    } catch (error) {
      return error;
    }
  }

  public async deletedUser(id: IUserEntities) {
    try {
      return await this.userRepository.deleteUserData(id);
    } catch (error) {
      return error;
    }
  }
}
