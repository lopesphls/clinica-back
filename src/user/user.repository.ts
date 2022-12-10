import { Injectable } from '@nestjs/common';
import { PrismaClient, Role } from '@prisma/client';
import { IUserEntities } from './entities/user.entities';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async getData() {
    return await this.prisma.user.findMany();
  }

  public async getDataById({ id }: IUserEntities) {
    try {
      return await this.prisma.user.findUniqueOrThrow({
        where: { id },
        include: { doctor: true, patient: true },
      });
    } catch (error) {
      return error;
    }
  }

  public async createInDb({ id, role, email, password }: IUserEntities) {
    try {
      if (role === Role.PATIENT) {
        return await this.prisma.user.create({
          data: {
            id,
            role,
            email,
            password,
            patient: {
              connect: {
                userId: id,
              },
            },
          },
        });
      } else if (role === Role.DOCTOR) {
        return await this.prisma.user.create({
          data: {
            id,
            role,
            email,
            password,
            doctor: {
              connect: {
                userId: id,
              },
            },
          },
        });
      }
    } catch (error) {
      return error;
    }
  }

  public async editUser({ id, email, password, role }: IUserEntities) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: { email, password, role },
        include: {
          doctor: true,
          patient: true,
        },
      });
    } catch (error) {
      return error;
    }
  }

  public async deleteUserData({ id }: IUserEntities) {
    try {
      return await this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      return error;
    }
  }
}
