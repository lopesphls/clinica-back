import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { randomUUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserEntities } from './entities/user.entities';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

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

  public async createdPatient({ email, password }: CreateUserDto) {
    try {
      const user: IUserEntities = {
        id: randomUUID(),
        email,
        password,
        role: Role.PATIENT,
      };
      return await this.userRepository.createInDb(user);
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
      return await this.userRepository.createInDb(user);
    } catch (error) {
      return error;
    }
  }

  public async updatedUser({ id, email, password, role }: UpdateUserDto) {
    try {
      return await this.userRepository.editUser({ id, email, password, role });
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
