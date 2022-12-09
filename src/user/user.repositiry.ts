import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { IUserEntities } from './entities/user.entities';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async getAll() {
    return await this.prisma.user.findMany();
  }

  public async createInData(user: IUserEntities) {
    try {
      return await this.prisma.user.create({ data: user });
    } catch (error) {
      return error;
    }
  }
}
