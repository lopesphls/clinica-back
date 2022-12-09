import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { randomUUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { IUserEntities } from './entities/user.entities';
import { UserRepository } from './user.repositiry';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async allUsers() {
    try {
      return await this.userRepository.getAll();
    } catch (error) {
      return error;
    }
  }

  public async createdPatient({ email, password }: CreateUserDto) {
    try {
      const user: IUserEntities = {
        id: randomUUID(),
        email,
        password,
        role: Role.PATIENT,
      };
      return await this.userRepository.createInData(user);
    } catch (error) {
      return error;
    }
  }

  public async createdDoctor({ email, password }: CreateUserDto) {
    try {
      const user: IUserEntities = {
        id: randomUUID(),
        email,
        password,
        role: Role.DOCTOR,
      };
      return await this.userRepository.createInData(user);
    } catch (error) {
      return error;
    }
  }
}
