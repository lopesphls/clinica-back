/* eslint-disable @typescript-eslint/no-misused-promises */
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ISpeciality } from './entities/speciality.entities';

@Injectable()
export class SpecialityRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async getAll() {
    return await this.prisma.speciality.findMany();
  }

  public async createSpeciality(medicalSpecialty: ISpeciality) {
    await this.prisma.speciality.create({ data: medicalSpecialty });
    return medicalSpecialty;
  }

  public async updateSpeciality({ id, name }: ISpeciality) {
    return await this.prisma.speciality.update({
      where: { id },
      data: { name },
    });
  }

  public async deleteSpeciality(result: string[]) {
    try {
      await this.prisma.speciality.deleteMany({
        where: {
          name: {
            in: result,
          },
        },
      });
      return result;
    } catch (error) {
      return error;
    }
  }
}
